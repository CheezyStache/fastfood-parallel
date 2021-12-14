import { Colors } from "@blueprintjs/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { getGlobalState } from "../../globalState/initGlobalState";
import { TimeSettings } from "../../models/globalState";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [key, setKey] = useState<string>(getRandomString());

  useEffect(() => {
    const check = currentId !== undefined;

    if (!check) {
      setIsEnabled(false);
      return;
    }

    const randomTimer = getRandomTime(processName);
    setTimer(randomTimer);

    setTimeout(() => {
      setKey(getRandomString());
    }, 100);

    setIsEnabled(true);
  }, [currentId]);

  if (!isEnabled) return <></>;

  return (
    <CountdownCircleTimer
      isPlaying
      duration={timer}
      colors={Colors.BLUE3}
      size={40}
      trailStrokeWidth={5}
      strokeWidth={5}
      onComplete={onTimeEnd}
      key={key}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
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

function getRandomString(): string {
  const randomString = require("crypto").randomBytes(64).toString("hex");
  return randomString;
}
