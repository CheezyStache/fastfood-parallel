import { Classes, Icon, Intent } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";

export interface WaitQueueItem {
  id: string;
  count: number;
}

interface WaitStatusProps {
  queue: WaitQueueItem[];
}

export const WaitStatus: FunctionComponent<WaitStatusProps> = ({ queue }) => {
  return (
    <div className="status-container">
      <div className={Classes.TEXT_LARGE}>Waiting: {queue.length}</div>
      <div>
        {queue.length === 0 && (
          <Icon icon="endorsed" size={30} intent={Intent.SUCCESS} />
        )}
        {queue
          .filter((s, index) => index < 3)
          .map((s, index) => (
            <Icon
              icon={index === 2 ? "array" : "user"}
              size={30}
              intent={Intent.DANGER}
              key={s + "_Queue_" + index}
            />
          ))}
      </div>
    </div>
  );
};
