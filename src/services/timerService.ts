import { getGlobalState } from "../globalState/initGlobalState";
import { TimeSettings } from "../models/globalState";

export function runAfterProcessEnded(process: Process, callback: () => void) {
  const time = generateProcessTime(process);

  setTimeout(callback, time * 1000);
}

type Process = keyof Omit<TimeSettings, "enterExitRange" | "workRange">;

function generateProcessTime(process: Process): number {
  const settings = getGlobalState("timeSettings");
  const time = settings[process];

  let range = 0;
  if (process === "enter" || process === "exit")
    range = settings.enterExitRange;
  else range = settings.workRange;

  const interval = randomIntFromInterval(time - range, time + range);
  return interval < 0 ? 0 : interval;
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
