import { onCook } from "./cookService";
import { onEvent } from "./queueService";

export function onOrderList(id: number): void {
  onEvent(id, "orderList", onCook);
}
