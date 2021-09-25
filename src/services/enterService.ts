import { getGlobalState, setGlobalState } from "../globalState/initGlobalState";
import { onCheckout } from "./checkoutService";
import { onEvent } from "./queueService";

export function addCustomer() {
  const id: number = getGlobalState("nextCustomerId");
  setGlobalState("nextCustomerId", id + 1);

  onEvent(id, "enter", onCheckout);
}
