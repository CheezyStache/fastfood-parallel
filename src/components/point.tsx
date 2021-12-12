import { Card, Classes } from "@blueprintjs/core";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getGlobalState, useGlobalState } from "../globalState/initGlobalState";
import { GlobalStateModel } from "../models/globalState";
import { PointStatus } from "./pointStatus";

type Process = keyof Omit<GlobalStateModel, "currentId" | "timeSettings">;

interface PointComponentProps {
  name: string;
  process: Process;
  nextProcess: Process[];
}

export const Point: FunctionComponent<PointComponentProps> = ({
  name,
  process,
  nextProcess,
}) => {
  const [state] = useGlobalState(process);
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    const sub = state.subscribe((prop) => {
      setQueue((old) => [...old, prop.id]);
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNextId = useCallback(() => {
    if (queue.length === 0) throw new Error("Can't find queue item");

    nextProcess.forEach((p) => {
      const next = getGlobalState(p);
      next.next({ id: queue[0] });
    });

    setQueue((old) => old.filter((q, index) => index !== 0));
  }, [setQueue, nextProcess, queue]);

  return (
    <Card key={name}>
      <div className={Classes.TEXT_LARGE}>{name}</div>
      <PointStatus queue={queue} processName={process} onNextId={onNextId} />
    </Card>
  );
};
