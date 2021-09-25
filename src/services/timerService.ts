import { getGlobalState } from "../globalState/initGlobalState";
import { TimeSettings } from "../models/globalState";
import { RandomUtils } from "../utils/randomUtils";

export function runAfterProcessEnded(process: Process, callback: () => void) {
  const time = generateProcessTime(process);

  setTimeout(() => callback(), time * 1000);
}

type Process = keyof Omit<TimeSettings, "enterExitRange" | "workRange">;

function generateProcessTime(process: Process): number {
  const settings = getGlobalState("timeSettings");
  const time = settings[process];

  let range = 0;
  if (process === "enter" || process === "exit")
    range = settings.enterExitRange;
  else range = settings.workRange;

  const interval = RandomUtils.randomIntFromInterval(
    time - range,
    time + range
  );
  return interval < 0 ? 0 : interval;
}
