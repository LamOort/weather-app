import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weather";
import type { FetchWeatherParams } from "../api/types";

export const useWeatherQuery = (params: FetchWeatherParams) => {
  return useQuery({
    queryKey: [
      "weather",
      params.latitude,
      params.longitude,
      params.timezone,
      params.temperature_unit,
    ],
    queryFn: () => fetchWeather(params),
    enabled:
      !!params.latitude &&
      !!params.longitude &&
      !!params.timezone &&
      !!params.temperature_unit,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
