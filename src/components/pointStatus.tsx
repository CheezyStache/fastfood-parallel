import { Card, Classes, Icon, Intent } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { TimeSettings } from "../models/globalState";
import { Timer } from "./timer";

interface PointStatusProps {
  queue: string[];
  processName: keyof TimeSettings;
  onNextId: () => void;
}

export const PointStatus: FunctionComponent<PointStatusProps> = ({
  queue,
  processName,
  onNextId,
}) => {
  return (
    <Card className="point-status">
      <div className="status-column">
        <Icon
          icon={queue[0] === undefined ? "ban-circle" : "endorsed"}
          size={30}
          intent={queue[0] === undefined ? Intent.DANGER : Intent.SUCCESS}
          className="work-status"
        />
        {queue.length === 0 && (
          <Icon icon="circle" size={30} intent={Intent.DANGER} />
        )}
        {queue
          .filter((s, index) => index < 3)
          .map((s, index) => (
            <Icon
              icon={index === 2 ? "array" : "user"}
              size={30}
              intent={Intent.SUCCESS}
              key={s + "_Queue_" + index}
            />
          ))}
      </div>
      <div className="text-column">
        <div className={Classes.TEXT_LARGE + " work-status work-status-margin"}>
          {queue[0] === undefined ? "No Work" : "In Work"}
        </div>
        <div className={Classes.TEXT_LARGE + " work-status work-status-margin"}>
          In Queue:
          {"\n" + queue.length}
        </div>
        <Timer
          currentId={queue[0]}
          processName={processName}
          onTimeEnd={onNextId}
        />
      </div>
    </Card>
  );
};
