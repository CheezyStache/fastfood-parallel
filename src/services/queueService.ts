import { getGlobalState, setGlobalState } from "../globalState/initGlobalState";
import { GlobalStateModel } from "../models/globalState";
import { PointProps } from "../models/pointProps";
import { RandomUtils } from "../utils/randomUtils";
import { runAfterProcessEnded } from "./timerService";

type Process = keyof Omit<
  GlobalStateModel,
  "packQueue" | "nextCustomerId" | "timeSettings"
>;

export function onEvent(
  id: number,
  process: Process,
  onEnd: (id: number) => void
): void {
  const state = getGlobalState(process);
  const index = findSmallestQueueIndex(state);

  console.log(index);
  if (
    state[index].currentId === undefined &&
    state[index].queueIds.length === 0
  ) {
    changeState(process, state, index, id);

    runAfterProcessEnded(process, () => onProccessEnd(process, onEnd, index));

    return;
  }

  changeState(
    process,
    state,
    index,
    state[index].currentId as number,
    undefined,
    id
  );
}

function findSmallestQueueIndex(state: PointProps[]): number {
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

function changeState(
  process: Process,
  state: PointProps[],
  index: number,
  currentId: number,
  queueIds?: number[],
  addQueueId?: number
): void {
  const newState = [...state];

  if (queueIds === undefined) queueIds = newState[index].queueIds;

  if (addQueueId !== undefined) queueIds.push(addQueueId);

  newState[index] = {
    ...newState[index],
    currentId: currentId,
    queueIds: queueIds,
  };

  setGlobalState(process, newState);
}

function onProccessEnd(
  process: Process,
  callback: (id: number) => void,
  index: number
): void {
  const state = getGlobalState(process);
  const id = state[index].currentId;
  if (id === undefined) throw Error("Id was lost during process execution");

  const firstId = state[index].queueIds[0];
  const newQueue = state[index].queueIds.slice(1);

  changeState(process, state, index, firstId, newQueue);

  callback(id);
  if (newQueue.length > 0 || firstId !== undefined)
    runAfterProcessEnded(process, () =>
      onProccessEnd(process, callback, index)
    );
}
