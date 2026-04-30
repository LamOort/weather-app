import { useState, useMemo } from "react";

import WeatherContext from "./WeatherContext";

type WeatherProviderProps = {
  children: React.ReactNode;
};

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [coord, setCoord] = useState<{ lat: number; lon: number }>({
    lat: 60.2052, //default coordidate is Espoo, Finland
    lon: 24.6522,
  });
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [locationName, setLocationName] = useState("Espoo");

  const value = useMemo(
    () => ({
      coord,
      setCoord,
      unit,
      setUnit,
      timezone,
      setTimezone,
      locationName,
      setLocationName,
    }),
    [coord, unit, timezone, locationName],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
