import { onOrderList } from "./orderListService";
import { findSmallestQueueIndex, onEvent } from "./queueService";

export function onCheckout(id: number): void {
  const checkoutIndex = findSmallestQueueIndex("checkout");

  onEvent(id, "checkout", onOrderList, checkoutIndex);
}
