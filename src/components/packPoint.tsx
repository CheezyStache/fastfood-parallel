import { Card, Classes } from "@blueprintjs/core";
import React, { FunctionComponent } from "react";
import { useGlobalState } from "../globalState/initGlobalState";
//import { PackPointStatus } from "./packPointStatus";

interface PackPointProps {
  name: string;
}

export const PackPoint: FunctionComponent<PackPointProps> = ({ name }) => {
  return <></>;
  //   const [state] = useGlobalState("packing");
  //   const [packQueue] = useGlobalState("packQueue");

  //   return (
  //     <>
  //       {state.map((s, index) => (
  //         <Card key={name + "_" + index}>
  //           <div className={Classes.TEXT_LARGE}>{name}</div>
  //           <PackPointStatus state={s} cookQueue={packQueue} />
  //         </Card>
  //       ))}
  //     </>
  //   );
};
