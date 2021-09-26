import { createGlobalState } from "react-hooks-global-state";
import { GlobalStateModel } from "../models/globalState";

const initialState: GlobalStateModel = {
  enter: [{ currentId: undefined, queueIds: [], timer: -1 }],
  checkout: [
    { currentId: undefined, queueIds: [], timer: -1 },
    { currentId: undefined, queueIds: [], timer: -1 },
  ],
  orderList: [{ currentId: undefined, queueIds: [], timer: -1 }],
  cookBurger: [{ currentId: undefined, queueIds: [], timer: -1 }],
  cookFries: [{ currentId: undefined, queueIds: [], timer: -1 }],
  cookDrinks: [{ currentId: undefined, queueIds: [], timer: -1 }],
  packing: [{ currentId: undefined, queueIds: [], timer: -1 }],
  delivery: [
    { currentId: undefined, queueIds: [], timer: -1 },
    { currentId: undefined, queueIds: [], timer: -1 },
  ],
  exit: [{ currentId: undefined, queueIds: [], timer: -1 }],

  packQueue: {
    burgers: [],
    fries: [],
    drinks: [],
  },
  nextCustomerId: 0,
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
