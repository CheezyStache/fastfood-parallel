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
}

export const Point: FunctionComponent<PointComponentProps> = ({
  name,
  process,
  nextProcess,
  waitCount,
}) => {
  const [state] = useGlobalState(process);
  const [queue, setQueue] = useState<string[]>([]);
  const [waitQueue, setWaitQueue] = useState<WaitQueueItem[]>([]);

  useEffect(() => {
    const sub = state.subscribe((prop) => {
      if (waitCount === undefined) {
        setQueue((old) => [...old, prop.id]);
        return;
      }

      setWaitQueue((old) => {
        const length = old.find((o) => o.id === prop.id)?.count ?? 0;
        return [
          ...old.filter((o) => o.id === prop.id),
          { id: prop.id, count: length + 1 },
        ];
      });
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const completed = waitQueue.filter((w) => w.count === waitCount);
    if (completed.length === 0) return;

    const removedIds = completed.map((c) => {
      sendToNextProcess(c.id);
      return c.id;
    });

    setWaitQueue((old) => old.filter((o) => !removedIds.includes(o.id)));
  }, [waitQueue]);

  const sendToNextProcess = useCallback(
    (id: string) => {
      nextProcess.forEach((p) => {
        const next = getGlobalState(p);
        next.next({ id: id });
      });
    },
    [nextProcess]
  );

  const onNextId = useCallback(() => {
    if (queue.length === 0) throw new Error("Can't find queue item");

    sendToNextProcess(queue[0]);

    setQueue((old) => old.filter((q, index) => index !== 0));
  }, [setQueue, sendToNextProcess, queue]);

  return (
    <Card key={name}>
      <div className={Classes.TEXT_LARGE}>{name}</div>
      <PointStatus
        queue={queue}
        processName={process}
        onNextId={onNextId}
        waitQueue={waitCount !== undefined ? waitQueue : undefined}
      />
    </Card>
  );
};
