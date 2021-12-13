import React, { FunctionComponent } from "react";
import { Point } from "./cards/point";

export const Map: FunctionComponent = () => {
  return (
    <div>
      <Point name="Enter" process="enter" nextProcess={["checkout"]} />
      <Point
        name="Checkout"
        process="checkout"
        nextProcess={["orderList", "delivery"]}
        isDouble
      />
      <Point
        name="Order list"
        process="orderList"
        nextProcess={["cookBurger", "cookFries", "cookDrinks"]}
      />
      <Point name="Burgers" process="cookBurger" nextProcess={["packing"]} />
      <Point name="Fries" process="cookFries" nextProcess={["packing"]} />
      <Point name="Drinks" process="cookDrinks" nextProcess={["packing"]} />
      <Point
        name="Packing"
        process="packing"
        nextProcess={["delivery"]}
        waitCount={3}
      />
      <Point
        name="Delivery"
        process="delivery"
        nextProcess={["exit"]}
        waitCount={2}
        isDouble
      />
      <Point name="Exit" process="exit" nextProcess={[]} />
    </div>
  );
};
