import axios from "axios";

const WEATHER_API_URL = "https://api.open-meteo.com/v1";
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1";

export const weatherClient = axios.create({
  baseURL: WEATHER_API_URL,
  timeout: 10000,
});

export const geoClient = axios.create({
  baseURL: GEO_API_URL,
  timeout: 10000,
});
