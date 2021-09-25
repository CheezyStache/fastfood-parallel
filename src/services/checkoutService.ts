import { onOrderList } from "./orderListService";
import { onEvent } from "./queueService";

export function onCheckout(id: number): void {
  onEvent(id, "checkout", onOrderList);
}
