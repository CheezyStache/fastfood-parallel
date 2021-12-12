import React from "react";
import "./App.css";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import { Point } from "./components/point";
import { Button } from "@blueprintjs/core";
import { addCustomer } from "./services/enterService";
import { DoublePoint } from "./components/doublePoint";
// import { PackPoint } from "./components/packPoint";

function App() {
  return (
    <div>
      <Button onClick={addCustomer} />
      <Point name="Enter" process="enter" nextProcess={["checkout"]} />
      <DoublePoint name="Checkout" process="checkout" nextProcess={[]} />
      {/*<Point name="Order list" process="orderList" />
      <Point name="Burgers" process="cookBurger" />
      <Point name="Fries" process="cookFries" />
      <Point name="Drinks" process="cookDrinks" /> */}
      {/* <PackPoint name="Packing" /> */}
      {/* <Point name="Delivery" process="delivery" />
      <Point name="Exit" process="exit" /> */}
    </div>
  );
}

export default App;
