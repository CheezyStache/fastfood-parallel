import { getGlobalState, setGlobalState } from "../globalState/initGlobalState";
// import { onCheckout } from "./checkoutService";
// import { onEvent } from "./queueService";

export function addCustomer() {
  const id: number = getGlobalState("currentId");
  setGlobalState("currentId", id + 1);

  const enterSubject = getGlobalState("enter");
  enterSubject.next({ id: id.toString() });
}
