export type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  country_code: string;
  country_id?: number;
  admin1?: string;
  admin1_id?: number;
  admin2?: string;
  admin2_id?: number;
  admin3?: string;
  admin3_id?: number;
  elevation?: number;
  feature_code?: string;
  population?: number;
  postcodes?: string[];
};

export type DailyVariable =
  | "weather_code"
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "precipitation_probability_max";

export type CurrentVariable =
  | "temperature_2m"
  | "apparent_temperature"
  | "is_day"
  | "precipitation"
  | "weather_code";

export type FetchWeatherParams = {
  latitude: number;
  longitude: number;
  daily: DailyVariable[];
  current: CurrentVariable[];
  timezone: string;
  past_days?: number;
  forecast_days?: number;
  temperature_unit?: "celsius" | "fahrenheit";
  timeformat?: "unixtime" | "iso8601";
};

export type CurrentUnits = {
  time: string;
  interval: string;
  temperature_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation: string;
  weather_code: string;
};

/** Raw daily arrays as returned by the Open-Meteo /forecast endpoint */
export type DailyData = {
  time: number[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
};

/** One element of the transformed 7-day forecast array */
export type DailyForecastDay = {
  time: number;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_probability_max: number;
};
