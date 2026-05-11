import { WeatherIcon } from "@/components/shared/WeatherIcon/WeatherIcon";
import type { DailyForecastDay } from "@/api/types";
import { FaTint } from "react-icons/fa";

import styles from "./DailyForecast.module.scss";

type Props = {
  data: DailyForecastDay[];
};

const DailyForecast = ({ data }: Props) => {
  return (
    <div className={styles.daily}>
      <div className={styles.title}>7-Day Forecast</div>

      <div className={styles.scroll}>
        {data.map((day) => {
          const date = new Date(day.time);

          const isToday = date.toDateString() === new Date().toDateString();

          const label = isToday
            ? "Today"
            : date.toLocaleDateString(undefined, {
                weekday: "short",
              });

          return (
            <div key={day.time} className={styles.dayCard}>
              <div className={styles.dayName}>{label}</div>

              <div className={styles.date}>
                {date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </div>

              <WeatherIcon code={day.weather_code} size={36} />

              <div className={styles.temp}>
                {Math.round(day.temperature_2m_min)}° /{" "}
                {Math.round(day.temperature_2m_max)}°
              </div>

              <div className={styles.rain}>
                <FaTint color="var(--clr-sky-400)" size={14} />{" "}
                {day.precipitation_probability_max}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
