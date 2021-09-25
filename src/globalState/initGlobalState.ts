import { createGlobalState } from "react-hooks-global-state";
import { GlobalStateModel } from "../models/globalState";

const initialState: GlobalStateModel = {
  enter: [{ currentId: undefined, queueIds: [] }],
  checkout: [
    { currentId: undefined, queueIds: [] },
    { currentId: undefined, queueIds: [] },
  ],
  orderList: [{ currentId: undefined, queueIds: [] }],
  cookBurger: [{ currentId: undefined, queueIds: [] }],
  cookFries: [{ currentId: undefined, queueIds: [] }],
  cookDrinks: [{ currentId: undefined, queueIds: [] }],
  packing: [{ currentId: undefined, queueIds: [] }],
  delivery: [
    { currentId: undefined, queueIds: [] },
    { currentId: undefined, queueIds: [] },
  ],
  exit: [{ currentId: undefined, queueIds: [] }],

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
