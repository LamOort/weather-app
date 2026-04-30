import { useState, useMemo } from "react";

import WeatherContext from "./WeatherContext";

type WeatherProviderProps = {
  children: React.ReactNode;
};

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [coord, setCoord] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [locationName, setLocationName] = useState("");

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
