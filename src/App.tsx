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
      <Button onClick={addCustomer} />
      <Point name="Enter" process="enter" />
      <Point name="Checkout" process="checkout" />
      <Point name="Order list" process="orderList" />
      <Point name="Burgers" process="cookBurger" />
      <Point name="Fries" process="cookFries" />
      <Point name="Drinks" process="cookDrinks" />
      <Point name="Packing" process="packing" />
      <Point name="Delivery" process="delivery" />
      <Point name="Exit" process="exit" />
    </div>
  );
}

export default App;
