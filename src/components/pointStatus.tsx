import { Card, Classes, Icon, Intent } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { PointProps } from "../models/pointProps";
import { Timer } from "./timer";

interface PointStatusProps {
  state: PointProps;
}

export const PointStatus: FunctionComponent<PointStatusProps> = ({ state }) => {
  return (
    <Card className="point-status">
      <div className="status-column">
        <Icon
          icon={state.currentId === undefined ? "ban-circle" : "endorsed"}
          size={30}
          intent={
            state.currentId === undefined ? Intent.DANGER : Intent.SUCCESS
          }
          className="work-status"
        />
        {state.queueIds.length === 0 && (
          <Icon icon="circle" size={30} intent={Intent.DANGER} />
        )}
        {state.queueIds
          .filter((s, index) => index < 3)
          .map((s, index) => (
            <Icon
              icon={index === 2 ? "array" : "user"}
              size={30}
              intent={Intent.SUCCESS}
              key={state.toString() + "Queue" + index}
            />
          ))}
      </div>
      <div className="text-column">
        <div className={Classes.TEXT_LARGE + " work-status work-status-margin"}>
          {state.currentId === undefined ? "No Work" : "In Work"}
        </div>
        <div className={Classes.TEXT_LARGE + " work-status work-status-margin"}>
          In Queue:
          {"\n" + state.queueIds.length}
        </div>
        <Timer state={state} />
      </div>
    </Card>
  );
};
