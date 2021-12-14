import React, { FunctionComponent } from "react";
import arrow from "../arrow-up.png";

interface ArrowProps {
  direction: "up" | "down";
}

export const Arrow: FunctionComponent<ArrowProps> = ({ direction }) => {
  let transform = "initial";
  switch (direction) {
    case "up":
      break;
    case "down":
      transform = "rotate(180deg)";
      break;
  }

  return (
    <img src={arrow} alt="arrow" className="arrow" style={{ transform }} />
  );
};
