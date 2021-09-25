import { Card, Classes } from "@blueprintjs/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useGlobalState } from "../globalState/initGlobalState";
import { GlobalStateModel } from "../models/globalState";
import { PointProps } from "../models/pointProps";
import { PointStatus } from "./pointStatus";

type Process = keyof Omit<
  GlobalStateModel,
  "packQueue" | "nextCustomerId" | "timeSettings"
>;

interface PointComponentProps {
  name: string;
  process: Process;
  index?: number;
}

export const Point: FunctionComponent<PointComponentProps> = ({
  name,
  process,
  index,
}) => {
  const [state] = useGlobalState(process);
  const [statusProps, setStatusProps] = useState<PointProps>({
    currentId: undefined,
    queueIds: [],
  });

  useEffect(() => {
    if (index === undefined) {
      setStatusProps(state as PointProps);
      return;
    }

    setStatusProps((state as PointProps[])[index]);
  }, [state, index]);

  return (
    <Card>
      <div className={Classes.TEXT_LARGE}>{name}</div>
      <PointStatus state={statusProps} />
    </Card>
  );
};
