import { getGlobalState, setGlobalState } from "../globalState/initGlobalState";
import { GlobalStateModel } from "../models/globalState";
import { PointProps } from "../models/pointProps";
import { runAfterProcessEnded } from "./timerService";

type Process = keyof Omit<GlobalStateModel, "nextCustomerId" | "timeSettings">;

export function onEvent(
  id: number,
  process: Process,
  onEnd: (id: number) => void,
  index: number = 0
): void {
  const state = getGlobalState(process);
  const isArray = Array.isArray(state);

  const currentState = isArray ? state[index] : state;

  if (
    currentState.currentId === undefined &&
    currentState.queueIds.length === 0
  ) {
    runAfterProcessEnded(process, () => onProccessEnd(process, onEnd, index));

    return;
  }

  let newState: PointProps | PointProps[];
  if (isArray) {
    state[index] = {
      ...state[index],
      queueIds: [...state[index].queueIds, id],
    };
    newState = state;
  } else
    newState = {
      ...state,
      queueIds: [...state.queueIds, id],
    };

  setGlobalState(process, newState);
}

function onProccessEnd(
  process: Process,
  callback: (id: number) => void,
  index: number = 0
): void {
  const state = getGlobalState(process);
  const isArray = Array.isArray(state);

  const currentState = isArray ? state[index] : state;
  const id = currentState.currentId;

  if (id === undefined) return;

  const firstId = currentState.queueIds[0];
  const newQueue = currentState.queueIds.slice(1);

  let newState: PointProps | PointProps[];
  if (isArray) {
    state[index] = { currentId: firstId, queueIds: newQueue };
    newState = state;
  } else newState = { currentId: firstId, queueIds: newQueue };

  setGlobalState(process, newState);

  callback(id);
  if (newQueue.length > 0) onProccessEnd(process, callback, index);
}
