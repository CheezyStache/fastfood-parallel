import { Card, Classes } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { useGlobalState } from "../globalState/initGlobalState";
import { GlobalStateModel } from "../models/globalState";
import { PointStatus } from "./pointStatus";

type Process = keyof Omit<
  GlobalStateModel,
  "packQueue" | "nextCustomerId" | "timeSettings"
>;

interface PointComponentProps {
  name: string;
  process: Process;
}

export const Point: FunctionComponent<PointComponentProps> = ({
  name,
  process,
}) => {
  const [state] = useGlobalState(process);

  return (
    <>
      {state.map((s, index) => (
        <Card key={name + "_" + index}>
          <div className={Classes.TEXT_LARGE}>{name + " " + (index + 1)}</div>
          <PointStatus state={s} />
        </Card>
      ))}
    </>
  );
};
