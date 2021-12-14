import { Card } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { Arrow } from "./arrow";
import { Point } from "./cards/point";

export const Map: FunctionComponent = () => {
  return (
    <div>
      <div className="cook-card">
        <Card>
          <div className="cook-group">
            <Point
              name="Burgers"
              process="cookBurger"
              nextProcess={["packing"]}
            />
            <Point name="Fries" process="cookFries" nextProcess={["packing"]} />
            <Point
              name="Drinks"
              process="cookDrinks"
              nextProcess={["packing"]}
            />
          </div>
        </Card>
      </div>

      <div className="arrow-parallel">
        <div className="arrow-group">
          <Arrow direction="up" />
        </div>
        <div className="arrow-group">
          <Arrow direction="down" />
        </div>
      </div>

      <div className="parallel">
        <Point
          name="Order list"
          process="orderList"
          nextProcess={["cookBurger", "cookFries", "cookDrinks"]}
        />
        <Point
          name="Packing"
          process="packing"
          nextProcess={["delivery"]}
          waitCount={3}
        />
      </div>

      <div className="arrow-parallel">
        <div className="arrow-group">
          <Arrow direction="up" />
          <Arrow direction="up" />
        </div>
        <div className="arrow-group">
          <Arrow direction="down" />
          <Arrow direction="down" />
        </div>
      </div>

      <div className="parallel">
        <div className="checkoutGroup">
          <Point
            name="Checkout"
            process="checkout"
            nextProcess={["orderList", "delivery"]}
            isDouble
          />
        </div>
        <div className="checkoutGroup">
          <Point
            name="Delivery"
            process="delivery"
            nextProcess={["exit"]}
            waitCount={2}
            isDouble
          />
        </div>
      </div>

      <div className="arrow-parallel">
        <div className="arrow-group">
          <Arrow direction="up" />
          <Arrow direction="up" />
        </div>
        <div className="arrow-group">
          <Arrow direction="down" />
          <Arrow direction="down" />
        </div>
      </div>

      <div className="parallel">
        <Point name="Enter" process="enter" nextProcess={["checkout"]} />
        <Point name="Exit" process="exit" nextProcess={[]} />
      </div>
    </div>
  );
};
