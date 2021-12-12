import { Card, Classes } from "@blueprintjs/core";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getGlobalState, useGlobalState } from "../globalState/initGlobalState";
import { GlobalStateModel } from "../models/globalState";
import { PointStatus, WaitQueueItem } from "./pointStatus";

type Process = keyof Omit<GlobalStateModel, "currentId" | "timeSettings">;

interface PointComponentProps {
  name: string;
  process: Process;
  nextProcess: Process[];
  waitCount?: number;
  isDouble?: boolean;
}

export const Point: FunctionComponent<PointComponentProps> = ({
  name,
  process,
  nextProcess,
  waitCount,
  isDouble,
}) => {
  const [state] = useGlobalState(process);
  const [queue1, setQueue1] = useState<string[]>([]);
  const [queue2, setQueue2] = useState<string[]>([]);
  const [waitQueue1, setWaitQueue1] = useState<WaitQueueItem[]>([]);
  const [waitQueue2, setWaitQueue2] = useState<WaitQueueItem[]>([]);

  const sendToNextProcess = useCallback(
    (id: string) => {
      nextProcess.forEach((p) => {
        const next = getGlobalState(p);
        next.next({ id: id });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const sub = state.subscribe((prop) => {
      if (
        isDouble &&
        ((waitCount === undefined && queue2.length < queue1.length) ||
          (waitCount !== undefined && waitQueue2.length < waitQueue1.length) ||
          waitQueue2.findIndex((w) => w.id === prop.id) !== -1)
      ) {
        onSubscription(prop.id, setQueue2, setWaitQueue2, waitCount);
        return;
      }

      onSubscription(prop.id, setQueue1, setWaitQueue1, waitCount);
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue1, queue2, waitQueue1, waitQueue2]);

  useEffect(() => {
    onWaitQueueChange(waitQueue1, setWaitQueue1, setQueue1, waitCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitQueue1]);

  useEffect(() => {
    if (isDouble)
      onWaitQueueChange(waitQueue2, setWaitQueue2, setQueue2, waitCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitQueue2]);

  const onNextId = useCallback(
    (index: number) => {
      if (index === 0) {
        onNextIdByQueue(queue1, setQueue1, sendToNextProcess);
        return;
      }

      onNextIdByQueue(queue2, setQueue2, sendToNextProcess);
    },
    [setQueue1, setQueue2, sendToNextProcess, queue1, queue2]
  );

  return (
    <>
      <Card key={name + "_1"}>
        <div className={Classes.TEXT_LARGE}>
          {name + (isDouble ? " 1" : "")}
        </div>
        <PointStatus
          queue={queue1}
          processName={process}
          onNextId={() => onNextId(0)}
          waitQueue={waitCount !== undefined ? waitQueue1 : undefined}
        />
      </Card>
      {isDouble && (
        <Card key={name + "_2"}>
          <div className={Classes.TEXT_LARGE}>{name + " 2"}</div>
          <PointStatus
            queue={queue2}
            processName={process}
            onNextId={() => onNextId(1)}
            waitQueue={waitCount !== undefined ? waitQueue2 : undefined}
          />
        </Card>
      )}
    </>
  );
};

function onSubscription(
  id: string,
  setQueue: (value: React.SetStateAction<string[]>) => void,
  setWaitQueue: (value: React.SetStateAction<WaitQueueItem[]>) => void,
  waitCount?: number
) {
  if (waitCount === undefined) {
    setQueue((old) => [...old, id]);
    return;
  }

  setWaitQueue((old) => {
    const length = old.find((o) => o.id === id)?.count ?? 0;
    return [...old.filter((o) => o.id !== id), { id: id, count: length + 1 }];
  });
}

function onNextIdByQueue(
  queue: string[],
  setQueue: (value: React.SetStateAction<string[]>) => void,
  sendToNextProcess: (id: string) => void
) {
  if (queue.length === 0) throw new Error("Can't find queue item");

  sendToNextProcess(queue[0]);

  setQueue((old) => old.filter((q, index) => index !== 0));
}

function onWaitQueueChange(
  waitQueue: WaitQueueItem[],
  setWaitQueue: (value: React.SetStateAction<WaitQueueItem[]>) => void,
  setQueue: (value: React.SetStateAction<string[]>) => void,
  waitCount?: number
) {
  const completed = waitQueue.filter((w) => w.count === waitCount);
  if (completed.length === 0) return;

  const removedIds = completed.map((c) => c.id);

  setQueue((old) => [...old, ...removedIds]);

  setWaitQueue((old) => old.filter((o) => !removedIds.includes(o.id)));
}
