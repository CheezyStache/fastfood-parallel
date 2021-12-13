import { Classes, Icon, Intent } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";

interface WorkStatusProps {
  inWork: boolean;
}

export const WorkStatus: FunctionComponent<WorkStatusProps> = ({ inWork }) => {
  return (
    <div className="status-container">
      <div className={Classes.TEXT_LARGE}>{inWork ? "In Work" : "No Work"}</div>
      <Icon
        icon={inWork ? "endorsed" : "ban-circle"}
        size={30}
        intent={inWork ? Intent.SUCCESS : Intent.DANGER}
        className="work-status"
      />
    </div>
  );
};
