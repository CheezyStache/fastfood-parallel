import { Card, Classes } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { TimeSettings } from "../../models/globalState";
import { QueueStatus } from "./queueStatus";
import { Timer } from "./timer";
import { WaitQueueItem, WaitStatus } from "./waitStatus";
import { WorkStatus } from "./workStatus";

interface StatusCardProps {
  name: string;
  queue: string[];
  processName: keyof Omit<
    TimeSettings,
    "entranceRange" | "checkoutRange" | "workRange"
  >;
  onNextId: () => void;
  waitQueue?: WaitQueueItem[];
}

export const StatusCard: FunctionComponent<StatusCardProps> = ({
  name,
  queue,
  processName,
  onNextId,
  waitQueue,
}) => {
  return (
    <Card className="status-card">
      <div>
        <h4 className={Classes.HEADING}>{name}</h4>
      </div>
      <div className="timer-container">
        <Timer
          currentId={queue[0]}
          processName={processName}
          onTimeEnd={onNextId}
        />
      </div>
      <WorkStatus inWork={queue[0] !== undefined} />
      <QueueStatus queue={queue} />
      {waitQueue !== undefined && <WaitStatus queue={waitQueue} />}
    </Card>
  );
};
