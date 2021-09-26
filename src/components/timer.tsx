import { Colors } from "@blueprintjs/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PointProps } from "../models/pointProps";

interface TimerProps {
  state: PointProps;
}

export const Timer: FunctionComponent<TimerProps> = ({ state }) => {
  const [second, setSecond] = useState<number>(-1);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setSecond((oldSecond) => {
          const newSecond = oldSecond - 1;

          if (newSecond <= -1) return -1;

          return newSecond;
        }),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state.timer === -1 || state.currentId === undefined) return;

    setSecond(state.timer);
  }, [state]);

  if (second === -1) return <></>;

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
            animation: `countdown ${state.timer}s linear infinite forwards`,
          }}
        ></circle>
      </svg>
    </div>
  );
};
