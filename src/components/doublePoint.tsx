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

interface DoublePointComponentProps {
  name: string;
  process: Process;
  nextProcess: Process[];
  waitCount?: number;
}

export const DoublePoint: FunctionComponent<DoublePointComponentProps> = ({
  name,
  process,
  nextProcess,
  waitCount,
}) => {
  const [state] = useGlobalState(process);
  const [queue1, setQueue1] = useState<string[]>([]);
  const [queue2, setQueue2] = useState<string[]>([]);
  const [waitQueue1, setWaitQueue1] = useState<WaitQueueItem[]>([]);
  const [waitQueue2, setWaitQueue2] = useState<WaitQueueItem[]>([]);

  useEffect(() => {
    const sub = state.subscribe((prop) => {
      if (queue2.length < queue1.length) {
        onSubscription(prop.id, setQueue2, setWaitQueue2);
        return;
      }

      onSubscription(prop.id, setQueue1, setWaitQueue1);
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue1, queue2]);

  useEffect(() => {
    onWaitQueueChange(waitQueue1, setWaitQueue1);
  }, [waitQueue1]);

  useEffect(() => {
    onWaitQueueChange(waitQueue2, setWaitQueue1);
  }, [waitQueue2]);

  const onSubscription = useCallback(
    (
      id: string,
      setQueue: (value: React.SetStateAction<string[]>) => void,
      setWaitQueue: (value: React.SetStateAction<WaitQueueItem[]>) => void
    ) => {
      if (waitCount === undefined) {
        setQueue((old) => [...old, id]);
        return;
      }

      setWaitQueue((old) => {
        const length = old.find((o) => o.id === id)?.count ?? 0;
        return [
          ...old.filter((o) => o.id === id),
          { id: id, count: length + 1 },
        ];
      });
    },
    []
  );

  const sendToNextProcess = useCallback(
    (id: string) => {
      nextProcess.forEach((p) => {
        const next = getGlobalState(p);
        next.next({ id: id });
      });
    },
    [nextProcess]
  );

  const onNextIdByQueue = useCallback(
    (
      queue: string[],
      setQueue: (value: React.SetStateAction<string[]>) => void
    ) => {
      if (queue.length === 0) throw new Error("Can't find queue item");

      sendToNextProcess(queue[0]);

      setQueue((old) => old.filter((q, index) => index !== 0));
    },
    [sendToNextProcess]
  );

  const onNextId = useCallback(
    (index: number) => {
      if (index === 0) {
        onNextIdByQueue(queue1, setQueue1);
        return;
      }

      onNextIdByQueue(queue2, setQueue2);
    },
    [setQueue1, setQueue2, onNextIdByQueue, queue1, queue2]
  );

  const onWaitQueueChange = useCallback(
    (
      waitQueue: WaitQueueItem[],
      setWaitQueue: (value: React.SetStateAction<WaitQueueItem[]>) => void
    ) => {
      const completed = waitQueue.filter((w) => w.count === waitCount);
      if (completed.length === 0) return;

      const removedIds = completed.map((c) => {
        sendToNextProcess(c.id);
        return c.id;
      });

      setWaitQueue((old) => old.filter((o) => !removedIds.includes(o.id)));
    },
    [sendToNextProcess, waitCount]
  );

  return (
    <>
      <Card key={name + "_1"}>
        <div className={Classes.TEXT_LARGE}>{name + " 1"}</div>
        <PointStatus
          queue={queue1}
          processName={process}
          onNextId={() => onNextId(0)}
          waitQueue={waitCount !== undefined ? waitQueue1 : undefined}
        />
      </Card>
      <Card key={name + "_2"}>
        <div className={Classes.TEXT_LARGE}>{name + " 2"}</div>
        <PointStatus
          queue={queue2}
          processName={process}
          onNextId={() => onNextId(1)}
          waitQueue={waitCount !== undefined ? waitQueue2 : undefined}
        />
      </Card>
    </>
  );
};
