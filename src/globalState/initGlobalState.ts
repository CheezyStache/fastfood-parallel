import { createGlobalState } from "react-hooks-global-state";
import { GlobalStateModel } from "../models/globalState";
import { PointProps } from "../models/pointProps";

const emptyPoint: PointProps = { currentId: undefined, queueIds: [] };

const initialState: GlobalStateModel = {
  enter: { ...emptyPoint },
  checkout: [{ ...emptyPoint }, { ...emptyPoint }],
  orderList: { ...emptyPoint },
  cookBurger: { ...emptyPoint },
  cookFries: { ...emptyPoint },
  cookDrinks: { ...emptyPoint },
  packing: { ...emptyPoint },
  delivery: [{ ...emptyPoint }, { ...emptyPoint }],
  exit: { ...emptyPoint },

  packQueue: {
    burgers: [],
    fries: [],
    drinks: [],
  },
  nextCustomerId: 0,
  timeSettings: {
    enter: 10,
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
