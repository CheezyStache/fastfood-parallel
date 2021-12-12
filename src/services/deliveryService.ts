import { onOrderList } from "./orderListService";
import { onEvent } from "./queueService";

export function onDelivery(id: number): void {
  // onEvent(id, "exit", onOrderList);
}
