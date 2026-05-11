import { WeatherIcon } from "@/components/shared/WeatherIcon/WeatherIcon";
import { weatherCodeToString } from "../utils/weatherCodeToString";
import type { CurrentUnits } from "@/api/types";
import { LuDroplet } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";

import styles from "./CurrentWeather.module.scss";

type Props = {
  location: string;
  temperature?: number;
  feelsLike?: number;
  weatherCode?: number;
  time?: string;
  units?: CurrentUnits;
  isDay?: boolean;
  precipitation?: number;
};

const CurrentWeather = ({
  location,
  temperature,
  feelsLike,
  weatherCode,
  time,
  units,
  isDay,
  precipitation,
}: Props) => {
  const date = time ? new Date(time) : new Date();
  const datePart = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const formatted = `${datePart} • ${timePart}`;

  return (
    <div className={`${styles.current} ${isDay ? styles.day : styles.night}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.locationWrapper}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <span className={styles.location}>{location}</span>
          </div>
          <div className={styles.time}>{formatted}</div>
        </div>
        <div className={styles.weatherIcon}>
          <WeatherIcon code={weatherCode} isDay={isDay} size={200} />
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.tempWrapper}>
          <span className={styles.temp}>
            {temperature !== undefined ? Math.round(temperature) : "--"}
          </span>
          <span className={styles.unit}>{units?.temperature_2m || "°"}</span>
        </div>

        <div className={styles.info}>
          <div className={styles.desc}>
            {weatherCode !== undefined
              ? weatherCodeToString(weatherCode)
              : "--"}
          </div>
          <div className={styles.feelsLike}>
            Feels like {feelsLike !== undefined ? Math.round(feelsLike) : "--"}
            {units?.apparent_temperature || "°"}
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <LuDroplet className={styles.statIcon} />
          <div className={styles.statReadable}>
            <span className={styles.statValue}>
              {precipitation !== undefined ? precipitation : "--"}
              {units?.precipitation}
            </span>
            <span className={styles.statLabel}>Precipitation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
