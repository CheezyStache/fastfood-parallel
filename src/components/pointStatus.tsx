import { Card, Classes, Icon, Intent } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { PointProps } from "../models/pointProps";

interface PointStatusProps {
  state: PointProps;
}

export const PointStatus: FunctionComponent<PointStatusProps> = ({ state }) => {
  return (
    <Card>
      <Icon
        icon={state.currentId === undefined ? "ban-circle" : "endorsed"}
        size={30}
        intent={state.currentId === undefined ? Intent.DANGER : Intent.SUCCESS}
      />
      <Icon
        icon={state.queueIds.length === 0 ? "square" : "array"}
        size={30}
        intent={state.queueIds.length === 0 ? Intent.DANGER : Intent.SUCCESS}
      />
      <div className={Classes.LARGE}>{state.queueIds.length}</div>
    </Card>
  );
};
