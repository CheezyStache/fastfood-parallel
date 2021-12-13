import { Button, Card } from "@blueprintjs/core";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getGlobalState, useGlobalState } from "../globalState/initGlobalState";
import { TimeSettings } from "../models/globalState";
import { SettingsField } from "./settings/settingsField";

export const Settings: FunctionComponent = () => {
  const [currentId, setCurrentId] = useGlobalState("currentId");
  const [enterSubject] = useGlobalState("enter");
  const [localTimeSettings, setLocalTimeSettings] = useState<TimeSettings>(
    getGlobalState("timeSettings")
  );
  const [timeSettings, setTimeSettings] = useGlobalState("timeSettings");

  useEffect(() => {
    setLocalTimeSettings(timeSettings);
  }, [timeSettings]);

  const onFieldChange = useCallback(
    (key: keyof TimeSettings) => (value: number) => {
      setLocalTimeSettings((old) => ({ ...old, [key]: value }));
    },
    [setLocalTimeSettings]
  );

  const confirmSettings = useCallback(() => {
    setTimeSettings(localTimeSettings);
  }, [setTimeSettings, localTimeSettings]);

  const addCustomer = useCallback(() => {
    const id: number = currentId;
    setCurrentId((old) => old + 1);

    enterSubject.next({ id: id.toString() });
  }, [currentId, setCurrentId, enterSubject]);

  return (
    <Card>
      <div className="fields-container">
        <div className="field-column">
          <SettingsField
            name="Enter time"
            value={localTimeSettings.enter}
            onChange={onFieldChange("enter")}
          />
          <SettingsField
            name="Checkout time"
            value={localTimeSettings.checkout}
            onChange={onFieldChange("checkout")}
          />
        </div>
        <div className="field-column">
          <SettingsField
            name="Order list time"
            value={localTimeSettings.orderList}
            onChange={onFieldChange("orderList")}
          />
          <SettingsField
            name="Burgers time"
            value={localTimeSettings.cookBurger}
            onChange={onFieldChange("cookBurger")}
          />
        </div>
        <div className="field-column">
          <SettingsField
            name="Fries time"
            value={localTimeSettings.cookFries}
            onChange={onFieldChange("cookFries")}
          />
          <SettingsField
            name="Drinks time"
            value={localTimeSettings.cookDrinks}
            onChange={onFieldChange("cookDrinks")}
          />
        </div>
        <div className="field-column">
          <SettingsField
            name="Packing time"
            value={localTimeSettings.packing}
            onChange={onFieldChange("packing")}
          />

          <SettingsField
            name="Delivery time"
            value={localTimeSettings.delivery}
            onChange={onFieldChange("delivery")}
          />
        </div>
        <div className="field-column">
          <SettingsField
            name="Exit time"
            value={localTimeSettings.exit}
            onChange={onFieldChange("exit")}
          />
          <SettingsField
            name="Entrance random range"
            value={localTimeSettings.entranceRange}
            onChange={onFieldChange("entranceRange")}
            dependentValues={[localTimeSettings.enter, localTimeSettings.exit]}
          />
        </div>
        <div className="field-column">
          <SettingsField
            name="Work random range"
            value={localTimeSettings.workRange}
            onChange={onFieldChange("workRange")}
            dependentValues={[
              localTimeSettings.orderList,
              localTimeSettings.cookBurger,
              localTimeSettings.cookFries,
              localTimeSettings.cookDrinks,
              localTimeSettings.packing,
            ]}
          />
          <SettingsField
            name="Checkout random range"
            value={localTimeSettings.checkoutRange}
            onChange={onFieldChange("checkoutRange")}
            dependentValues={[
              localTimeSettings.checkout,
              localTimeSettings.delivery,
            ]}
          />
        </div>
        <div className="button-column">
          <Button icon="add" text="Add customer" onClick={addCustomer} />
          <Button
            icon="confirm"
            text="Confirm settings"
            onClick={confirmSettings}
          />
        </div>
      </div>
    </Card>
  );
};
