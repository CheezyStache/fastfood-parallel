import { Card, Classes, Icon, Intent } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { PackQueue } from "../models/globalState";
import { PointProps } from "../models/pointProps";

interface PackPointStatusProps {
  state: PointProps;
  cookQueue: PackQueue;
}

export const PackPointStatus: FunctionComponent<PackPointStatusProps> = ({
  state,
  cookQueue,
}) => {
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
      <Icon
        icon={cookQueue.burgers.length === 0 ? "square" : "array"}
        size={30}
        intent={cookQueue.burgers.length === 0 ? Intent.DANGER : Intent.SUCCESS}
      />
      <Icon
        icon={cookQueue.fries.length === 0 ? "square" : "array"}
        size={30}
        intent={cookQueue.fries.length === 0 ? Intent.DANGER : Intent.SUCCESS}
      />
      <Icon
        icon={cookQueue.drinks.length === 0 ? "square" : "array"}
        size={30}
        intent={cookQueue.drinks.length === 0 ? Intent.DANGER : Intent.SUCCESS}
      />
      <div className={Classes.LARGE}>{state.queueIds.length}</div>
    </Card>
  );
};
