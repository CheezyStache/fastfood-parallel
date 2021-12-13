import { NumericInput, Classes } from "@blueprintjs/core";
import React, { FunctionComponent, useCallback } from "react";

interface SettingsFieldProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
  dependentValues?: number[];
}

export const SettingsField: FunctionComponent<SettingsFieldProps> = ({
  name,
  value,
  onChange,
  dependentValues,
}) => {
  const filterNumbers = useCallback(
    (valNum: number, valString: string) => {
      if (valString.trim() === "") {
        onChange(0);
        return;
      }

      const reg = new RegExp("^[0-9]+$");

      if (!reg.test(valString)) return;
      onChange(valNum);
    },
    [onChange]
  );

  const maxValue =
    dependentValues !== undefined
      ? Math.min(...dependentValues) - 1
      : undefined;
  const minValue = dependentValues !== undefined ? 0 : 1;

  return (
    <div>
      <div>
        <h5 className={Classes.TEXT_LARGE + " label"}>{name}</h5>
      </div>
      <NumericInput
        allowNumericCharactersOnly={true}
        majorStepSize={null}
        minorStepSize={null}
        stepSize={1}
        min={minValue}
        max={maxValue}
        value={value}
        onValueChange={filterNumbers}
        fill={true}
      />
    </div>
  );
};
