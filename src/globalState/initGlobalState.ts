import { createGlobalState } from "react-hooks-global-state";
import { Subject } from "rxjs";
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
    enter: 5,
    checkout: 10,
    orderList: 10,
    cookBurger: 10,
    cookFries: 10,
    cookDrinks: 10,
    packing: 10,
    delivery: 10,
    exit: 10,

    enterExitRange: 1,
    workRange: 1,
  },
};

export const { useGlobalState, getGlobalState, setGlobalState } =
  createGlobalState(initialState);
