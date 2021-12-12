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

interface DoublePointComponentProps {
  name: string;
  process: Process;
  nextProcess: Process[];
}

export const DoublePoint: FunctionComponent<DoublePointComponentProps> = ({
  name,
  process,
  nextProcess,
}) => {
  const [state] = useGlobalState(process);
  const [queue1, setQueue1] = useState<string[]>([]);
  const [queue2, setQueue2] = useState<string[]>([]);

  useEffect(() => {
    const sub = state.subscribe((prop) => {
      if (queue2.length < queue1.length) {
        setQueue2((old) => [...old, prop.id]);
        return;
      }

      setQueue1((old) => [...old, prop.id]);
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue1, queue2]);

  const onNextId = useCallback(
    (index: number) => {
      if (index === 0) {
        if (queue1.length === 0) throw new Error("Can't find queue item");

        nextProcess.forEach((p) => {
          const next = getGlobalState(p);
          next.next({ id: queue1[0] });
        });

        setQueue1((old) => old.filter((q, index) => index !== 0));
        return;
      }

      if (queue2.length === 0) throw new Error("Can't find queue item");

      nextProcess.forEach((p) => {
        const next = getGlobalState(p);
        next.next({ id: queue2[0] });
      });

      setQueue2((old) => old.filter((q, index) => index !== 0));
      return;
    },
    [setQueue1, setQueue2, nextProcess, queue1, queue2]
  );

  return (
    <>
      <Card key={name + "_1"}>
        <div className={Classes.TEXT_LARGE}>{name + " 1"}</div>
        <PointStatus
          queue={queue1}
          processName={process}
          onNextId={() => onNextId(0)}
        />
      </Card>
      <Card key={name + "_2"}>
        <div className={Classes.TEXT_LARGE}>{name + " 2"}</div>
        <PointStatus
          queue={queue2}
          processName={process}
          onNextId={() => onNextId(1)}
        />
      </Card>
    </>
  );
};
