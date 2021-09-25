import { onOrderList } from "./orderListService";
import { findSmallestQueueIndex, onEvent } from "./queueService";

export function onDelivery(id: number): void {
  const deliveryIndex = findSmallestQueueIndex("delivery");

  onEvent(id, "exit", onOrderList, deliveryIndex);
}
