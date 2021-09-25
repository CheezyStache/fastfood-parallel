import { getGlobalState, setGlobalState } from "../globalState/initGlobalState";
import { PackQueue } from "../models/globalState";
import { onDelivery } from "./deliveryService";
import { onEvent } from "./queueService";

export function onPack(id: number, product: keyof PackQueue): void {
  switch (product) {
    case "burgers":
      pushProduct(id, "burgers");
      break;
    case "fries":
      pushProduct(id, "fries");
      break;
    case "drinks":
      pushProduct(id, "drinks");
      break;
  }

  const packQueue = getGlobalState("packQueue");

  if (
    packQueue.burgers.includes(id) &&
    packQueue.fries.includes(id) &&
    packQueue.drinks.includes(id)
  )
    onEvent(id, "delivery", onDelivery);
}

function pushProduct(id: number, product: keyof PackQueue): void {
  setGlobalState("packQueue", (oldQueue) => ({
    ...oldQueue,
    [product]: [...oldQueue[product], id],
  }));
}
