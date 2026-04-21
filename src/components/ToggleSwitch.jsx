import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext.jsx";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, temperatureUnit } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggleSwitch">
      <input
        type="checkbox"
        className="toggleSwitch_checkbox"
        // checked={temperatureUnit === "F"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggleSwitch_slider"></span>
      <span
        className={`toggleSwitch_text toggleSwitch__text_F ${temperatureUnit === "F" ? "toggleSwitch_text_color_white" : ""}`}
      >
        F
      </span>
      <span
        className={`toggleSwitch_text toggleSwitch__text_C ${temperatureUnit === "C" ? "toggleSwitch_text_color_white" : ""}`}
      >
        C
      </span>
    </label>
  );
}
