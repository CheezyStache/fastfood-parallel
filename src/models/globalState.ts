import { Subject } from "rxjs";
import { EventLog } from "../eventLog";
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
  eventLog: EventLog;
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

  entranceRange: number;
  checkoutRange: number;
  workRange: number;
}
