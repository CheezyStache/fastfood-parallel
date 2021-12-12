import { Colors } from "@blueprintjs/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { interval, take, tap } from "rxjs";
import { useGlobalState } from "../globalState/initGlobalState";
import { TimeSettings } from "../models/globalState";

interface TimerProps {
  currentId: string | undefined;
  processName: keyof TimeSettings;
  onTimeEnd: () => void;
}

export const Timer: FunctionComponent<TimerProps> = ({
  currentId,
  processName: pointName,
  onTimeEnd,
}) => {
  const [globalTimer] = useGlobalState("timeSettings");
  const [timer, setTimer] = useState<number>(0);
  const [second, setSecond] = useState<number>(-1);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (timer === globalTimer[pointName]) return;

    setTimer(globalTimer[pointName]);
  }, [globalTimer]);

  useEffect(() => {
    setIsEnabled(currentId !== undefined);
    if (currentId === undefined) return;

    setSecond(timer);

    const sub = interval(1000)
      .pipe(
        tap(() => setSecond((old) => old - 1)),
        take(timer)
      )
      .subscribe({ complete: () => onTimeEnd() });

    return () => sub.unsubscribe();
  }, [currentId]);

  if (!isEnabled) return <></>;

  return (
    <div className="timer">
      <div className="timer-number" style={{ color: Colors.BLUE3 }}>
        {second}
      </div>
      <svg className="timer-svg">
        <circle
          r="18"
          cx="20"
          cy="20"
          color={Colors.BLUE3}
          stroke={Colors.BLUE3}
          style={{
            animation: `countdown ${timer}s linear infinite forwards`,
          }}
        ></circle>
      </svg>
    </div>
  );
};
