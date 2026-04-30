import { geoClient, weatherClient } from "./client";
import type { Location, FetchWeatherParams } from "./types";

export const searchLocations = async (search: string): Promise<Location[]> => {
  const response = await geoClient.get<{ results?: Location[] }>(
    `/search?name=${encodeURIComponent(search)}`,
  );
  return response.data.results ?? [];
};

export const fetchWeather = async (params: FetchWeatherParams) => {
  const response = await weatherClient.get("/forecast", { params });

  return response.data;
};
