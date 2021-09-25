import { getGlobalState, setGlobalState } from "../globalState/initGlobalState";
import { GlobalStateModel } from "../models/globalState";
import { PointProps } from "../models/pointProps";
import { RandomUtils } from "../utils/randomUtils";
import { runAfterProcessEnded } from "./timerService";

type Process = keyof Omit<
  GlobalStateModel,
  "packQueue" | "nextCustomerId" | "timeSettings"
>;
type ArrayProcess = keyof Pick<GlobalStateModel, "checkout" | "delivery">;

export function findSmallestQueueIndex(process: ArrayProcess): number {
  const state = getGlobalState(process);

  const minLength = state.sort(
    (a, b) => a.queueIds.length - b.queueIds.length
  )[0].queueIds.length;

  const freeQueues = state
    .map((s, index) => ({ s, index }))
    .filter((s) => s.s.queueIds.length === minLength);
  if (freeQueues.length === 1) return freeQueues[0].index;

  return freeQueues[RandomUtils.randomIntFromInterval(0, freeQueues.length - 1)]
    .index;
}

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
    const newCurrentState = setNewCurrentId(state, id, index);
    setGlobalState(process, newCurrentState);

    runAfterProcessEnded(process, () => onProccessEnd(process, onEnd, index));

    return;
  }

  const newQueueState = setNewQueue(state, id, index);

  setGlobalState(process, newQueueState);
}

function setNewCurrentId(
  state: PointProps | PointProps[],
  id: number,
  index: number = 0
): PointProps | PointProps[] {
  const isArray = Array.isArray(state);

  let newState: PointProps | PointProps[];
  if (isArray) {
    state[index] = {
      ...state[index],
      currentId: id,
    };
    newState = state;
  } else
    newState = {
      ...state,
      currentId: id,
    };

  return newState;
}

function setNewQueue(
  state: PointProps | PointProps[],
  id: number,
  index: number = 0
): PointProps | PointProps[] {
  const isArray = Array.isArray(state);

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

  return newState;
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
  if (newQueue.length > 0)
    runAfterProcessEnded(process, () =>
      onProccessEnd(process, callback, index)
    );
}
