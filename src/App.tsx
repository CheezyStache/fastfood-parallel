import React from "react";
import "./App.css";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import { Point } from "./components/point";
import { Button } from "@blueprintjs/core";
import { addCustomer } from "./services/enterService";

function App() {
  return (
    <div>
      <Button onClick={() => addCustomer()} />
      <Point name="Enter" process="enter" />
      <Point name="Checkout 1" process="checkout" index={0} />
      <Point name="Checkout 2" process="checkout" index={1} />
      <Point name="Order list" process="orderList" />
      <Point name="Burgers" process="cookBurger" />
      <Point name="Fries" process="cookFries" />
      <Point name="Drinks" process="cookDrinks" />
      <Point name="Packing" process="packing" />
      <Point name="Delivery 1" process="delivery" index={0} />
      <Point name="Delivery 2" process="delivery" index={1} />
      <Point name="Exit" process="exit" />
    </div>
  );
}

export default App;
