import { Classes, Icon, Intent } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";

interface QueueStatusProps {
  queue: string[];
}

export const QueueStatus: FunctionComponent<QueueStatusProps> = ({ queue }) => {
  return (
    <div className="status-container">
      <div className={Classes.TEXT_LARGE}>In Queue: {queue.length}</div>
      <div>
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
    </div>
  );
};
