import { WeatherIcon } from "@/components/shared/WeatherIcon/WeatherIcon";
import { weatherCodeToString } from "../utils/weatherCodeToString";
import type { CurrentUnits } from "@/api/types";
import { LuDroplet } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";

import "./CurrentWeather.scss";

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
    <div className={`current ${isDay ? "current--day" : "current--night"}`}>
      <div className="current__header">
        <div className="current__header-content">
          <div className="current__location-wrapper">
            <FaMapMarkerAlt className="current__location-icon" />
            <span className="current__location">{location}</span>
          </div>
          <div className="current__time">{formatted}</div>
        </div>
        <div className="current__weather-icon">
          <WeatherIcon code={weatherCode} isDay={isDay} size={200} />
        </div>
      </div>

      <div className="current__main">
        <div className="current__temp-wrapper">
          <span className="current__temp">
            {temperature !== undefined ? Math.round(temperature) : "--"}
          </span>
          <span className="current__unit">{units?.temperature_2m || "°"}</span>
        </div>

        <div className="current__info">
          <div className="current__desc">
            {weatherCode !== undefined
              ? weatherCodeToString(weatherCode)
              : "--"}
          </div>
          <div className="current__feels-like">
            Feels like {feelsLike !== undefined ? Math.round(feelsLike) : "--"}
            {units?.apparent_temperature || "°"}
          </div>
        </div>
      </div>

      <div className="current__stats">
        <div className="current__stat">
          <LuDroplet className="current__stat-icon" />
          <div className="current__stat-readable">
            <span className="current__stat-value">
              {precipitation !== undefined ? precipitation : "--"}
              {units?.precipitation}
            </span>
            <span className="current__stat-label">Precipitation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
