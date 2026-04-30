export type WeatherIconName =
  | "clear-day"
  | "clear-night"
  | "partly-cloudy-day"
  | "partly-cloudy-night"
  | "cloudy"
  | "fog"
  | "rain"
  | "showers"
  | "sleet"
  | "snow"
  | "snow-showers"
  | "thunderstorm";

export function isNightTime(date: Date): boolean {
  const hours = date.getHours();
  return hours >= 18 || hours < 6;
}

export function getWeatherIconName(
  code: number,
  isDay: boolean = true,
): WeatherIconName {
  // helper to swap day/night
  const withDayNight = (iconName: WeatherIconName) => {
    if (isDay) return iconName;
    return iconName.replace("day", "night") as WeatherIconName;
  };

  // clear / clouds
  if (code === 0) return withDayNight("clear-day");
  if (code === 1 || code === 2) return withDayNight("partly-cloudy-day");
  if (code === 3) return "cloudy";

  // fog
  if (code === 45 || code === 48) return "fog";

  // drizzle
  if ([51, 53, 55].includes(code)) return "rain";

  // freezing drizzle
  if ([56, 57].includes(code)) return "sleet";

  // rain
  if ([61, 63, 65].includes(code)) return "rain";

  // freezing rain
  if ([66, 67].includes(code)) return "sleet";

  // snow
  if ([71, 73, 75, 77].includes(code)) return "snow";

  // rain showers
  if ([80, 81, 82].includes(code)) return "showers";

  // snow showers
  if ([85, 86].includes(code)) return "snow-showers";

  // thunderstorm
  if ([95, 96, 99].includes(code)) return "thunderstorm";

  // fallback
  return "cloudy";
}

export function resolveIconSlug(code?: number, isDay?: boolean) {
  if (code !== undefined) {
    return getWeatherIconName(code, isDay);
  }

  return "cloudy"; // fallback
}
