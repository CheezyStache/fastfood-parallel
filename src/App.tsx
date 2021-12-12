import React, { useCallback } from "react";
import "./App.css";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import { Point } from "./components/point";
import { Button } from "@blueprintjs/core";
import { useGlobalState } from "./globalState/initGlobalState";

function App() {
  const [currentId, setCurrentId] = useGlobalState("currentId");
  const [enterSubject] = useGlobalState("enter");

  const addCustomer = useCallback(() => {
    const id: number = currentId;
    setCurrentId((old) => old + 1);

    enterSubject.next({ id: id.toString() });
  }, [currentId, setCurrentId, enterSubject]);

  return (
    <div>
      <Button onClick={addCustomer} />
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
}

export default App;
