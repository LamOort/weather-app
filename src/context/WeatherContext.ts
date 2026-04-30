import { createContext, useContext } from "react";

type TWeatherContext = {
  coord: { lat: number; lon: number };
  setCoord(coord: { lat: number; lon: number }): void;
  unit: "celsius" | "fahrenheit";
  setUnit(unit: "celsius" | "fahrenheit"): void;
  timezone: string;
  setTimezone(timezone: string): void;
  locationName: string;
  setLocationName(locationName: string): void;
};

const WeatherContext = createContext<TWeatherContext | null>(null);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }

  return context;
};

export default WeatherContext;
