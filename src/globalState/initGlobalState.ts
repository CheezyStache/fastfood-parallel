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
    enter: 2,
    checkout: 10,
    orderList: 5,
    cookBurger: 15,
    cookFries: 12,
    cookDrinks: 10,
    packing: 15,
    delivery: 10,
    exit: 2,

    enterExitRange: 4,
    workRange: 15,
  },
};

export const { useGlobalState, getGlobalState, setGlobalState } =
  createGlobalState(initialState);
