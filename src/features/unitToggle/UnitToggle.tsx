import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useWeatherContext } from "@/context/WeatherContext";
import styles from "./UnitToggle.module.scss";

const UnitToggle = () => {
  const { unit, setUnit } = useWeatherContext();

  return (
    <ToggleGroup
      value={[unit]}
      onValueChange={(values) => {
        const next = values[0];
        if (next) setUnit(next);
      }}
      className={styles.group}
    >
      <Toggle value="celsius" className={styles.btn} aria-label="Celsius">
        °C
      </Toggle>
      <Toggle
        value="fahrenheit"
        className={styles.btn}
        aria-label="Fahrenheit"
      >
        °F
      </Toggle>
    </ToggleGroup>
  );
};

export default UnitToggle;
