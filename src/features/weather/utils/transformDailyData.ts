import type { DailyData, DailyForecastDay } from "@/api/types";

/**
 * Transforms the column-oriented Open-Meteo daily response
 * into a row-oriented array of per-day objects.
 *
 * @example
 * const days = transformDailyData(data.daily);
 * // days[0] → { time, weather_code, temperature_2m_max, ... } for day 1
 */
export function transformDailyData(daily: DailyData): DailyForecastDay[] {
  return daily.time?.map((time, i) => ({
    time,
    weather_code: daily.weather_code[i],
    temperature_2m_max: daily.temperature_2m_max[i],
    temperature_2m_min: daily.temperature_2m_min[i],
    precipitation_probability_max: daily.precipitation_probability_max[i],
  }));
}
