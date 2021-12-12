import { Subject } from "rxjs";
import { StreamProps } from "./streamProps";

export interface GlobalStateModel {
  enter: Subject<StreamProps>;
  checkout: Subject<StreamProps>;
  orderList: Subject<StreamProps>;
  cookBurger: Subject<StreamProps>;
  cookFries: Subject<StreamProps>;
  cookDrinks: Subject<StreamProps>;
  packing: Subject<StreamProps>;
  delivery: Subject<StreamProps>;
  exit: Subject<StreamProps>;

  currentId: number;
  timeSettings: TimeSettings;
}

export interface PackQueue {
  burgers: number[];
  fries: number[];
  drinks: number[];
}

export interface TimeSettings {
  enter: number;
  checkout: number;
  orderList: number;
  cookBurger: number;
  cookFries: number;
  cookDrinks: number;
  packing: number;
  delivery: number;
  exit: number;

  enterExitRange: number;
  workRange: number;
}
