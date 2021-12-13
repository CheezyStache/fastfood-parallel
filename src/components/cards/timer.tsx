import { Colors } from "@blueprintjs/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { interval, take, tap } from "rxjs";
import { getGlobalState } from "../../globalState/initGlobalState";
import { TimeSettings } from "../../models/globalState";

interface TimerProps {
  currentId: string | undefined;
  processName: keyof Omit<
    TimeSettings,
    "entranceRange" | "checkoutRange" | "workRange"
  >;
  onTimeEnd: () => void;
}

export const Timer: FunctionComponent<TimerProps> = ({
  currentId,
  processName,
  onTimeEnd,
}) => {
  const [timer, setTimer] = useState<number>(0);
  const [second, setSecond] = useState<number>(-1);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    setIsEnabled(currentId !== undefined);
    if (currentId === undefined) return;

    const randomTimer = getRandomTime(processName);

    setTimer(randomTimer);
    setSecond(randomTimer);

    const sub = interval(1000)
      .pipe(
        tap(() => setSecond((old) => old - 1)),
        take(randomTimer)
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

function getRandomTime(
  processName: keyof Omit<
    TimeSettings,
    "entranceRange" | "checkoutRange" | "workRange"
  >
): number {
  const timeSettings = getGlobalState("timeSettings");
  const time = timeSettings[processName];

  let range: number = 0;
  switch (processName) {
    case "enter":
    case "exit":
      range = timeSettings.entranceRange;
      break;
    case "checkout":
    case "delivery":
      range = timeSettings.checkoutRange;
      break;

    default:
      range = timeSettings.workRange;
      break;
  }

  return getRandomInt(time - range, time + range + 1);
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
