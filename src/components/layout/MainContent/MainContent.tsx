import { useMemo } from "react";
import CurrentWeather from "@/features/weather/components/CurrentWeather";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { useWeatherContext } from "@/context/WeatherContext";

import { transformDailyData } from "@/features/weather/utils/transformDailyData";
import DailyForecast from "@/features/weather/components/DailyForecast";
import {
  CurrentWeatherSkeleton,
  DailyForecastSkeleton,
} from "@/features/weather/components/WeatherSkeleton";

import "./MainContent.scss";

const MainContent = () => {
  const { coord, timezone, locationName, unit } = useWeatherContext();

  const { data, isFetching, isSuccess, isError } = useWeatherQuery({
    latitude: coord.lat,
    longitude: coord.lon,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
    ],
    current: [
      "weather_code",
      "temperature_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
    ],
    timezone,
    temperature_unit: unit,
    past_days: 0,
    forecast_days: 7,
  });

  const currentWeatherData = useMemo(
    () => ({
      temperature: data?.current.temperature_2m,
      feelsLike: data?.current.apparent_temperature,
      weatherCode: data?.current.weather_code,
      time: data?.current.time,
      isDay: data?.current.is_day,
      units: data?.current_units,
      precipitation: data?.current.precipitation,
    }),
    [data],
  );

  const dailyWeatherData = useMemo(
    () => transformDailyData(data?.daily || []),
    [data],
  );

  const isShowedCurrentWeatherAndDailyForecast = !isFetching && isSuccess;

  return (
    <main className="main">
      {isFetching ? (
        <>
          <section className="current-card">
            <CurrentWeatherSkeleton />
          </section>
          <section className="daily-section">
            <DailyForecastSkeleton />
          </section>
        </>
      ) : null}

      {isError && <p className="main__error">Please try again later</p>}

      {isShowedCurrentWeatherAndDailyForecast ? (
        <>
          <section className="current-card">
            <CurrentWeather
              location={locationName}
              temperature={currentWeatherData?.temperature}
              feelsLike={currentWeatherData?.feelsLike}
              weatherCode={currentWeatherData?.weatherCode}
              time={currentWeatherData?.time}
              isDay={!!currentWeatherData?.isDay}
              units={currentWeatherData?.units}
              precipitation={currentWeatherData?.precipitation}
            />
          </section>

          <section className="daily-section">
            <DailyForecast data={dailyWeatherData || []} />
          </section>
        </>
      ) : null}
    </main>
  );
};

export default MainContent;
