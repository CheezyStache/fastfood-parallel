import { createGlobalState } from "react-hooks-global-state";
import { Subject } from "rxjs";
import { EventLog } from "../eventLog";
import { GlobalStateModel } from "../models/globalState";
import { StreamProps } from "../models/streamProps";

const initialState: GlobalStateModel = {
  enter: new Subject<StreamProps>(),
  checkout: new Subject<StreamProps>(),
  orderList: new Subject<StreamProps>(),
  cookBurger: new Subject<StreamProps>(),
  cookFries: new Subject<StreamProps>(),
  cookDrinks: new Subject<StreamProps>(),
  packing: new Subject<StreamProps>(),
  delivery: new Subject<StreamProps>(),
  exit: new Subject<StreamProps>(),

  currentId: 0,

  timeSettings: {
    enter: 3,
    checkout: 10,
    orderList: 8,
    cookBurger: 10,
    cookFries: 8,
    cookDrinks: 6,
    packing: 8,
    delivery: 10,
    exit: 4,

    entranceRange: 1,
    checkoutRange: 2,
    workRange: 2,
  },
  eventLog: new EventLog(),
};

export const { useGlobalState, getGlobalState, setGlobalState } =
  createGlobalState(initialState);
