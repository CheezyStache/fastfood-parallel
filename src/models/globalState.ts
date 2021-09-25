import { PointProps } from "./pointProps";

export interface GlobalStateModel {
  enter: PointProps;
  checkout: PointProps[];
  orderList: PointProps;
  cookBurger: PointProps;
  cookFries: PointProps;
  cookDrinks: PointProps;
  packing: PointProps;
  delivery: PointProps[];
  exit: PointProps;

  packQueue: PackQueue;

  nextCustomerId: number;
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
