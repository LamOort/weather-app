import { WeatherIcon } from "@/components/shared/WeatherIcon/WeatherIcon";
import type { DailyForecastDay } from "@/api/types";
import { FaTint } from "react-icons/fa";

import "./DailyForecast.scss";

type Props = {
  data: DailyForecastDay[];
};

const DailyForecast = ({ data }: Props) => {
  return (
    <div className="daily">
      <div className="daily__title">7-Day Forecast</div>

      <div className="daily__scroll">
        {data.map((day) => {
          const date = new Date(day.time);

          const isToday = date.toDateString() === new Date().toDateString();

          const label = isToday
            ? "Today"
            : date.toLocaleDateString(undefined, {
                weekday: "short",
              });

          return (
            <div key={day.time} className={`day-card`}>
              <div className="day-card__day">{label}</div>

              <div className="day-card__date">
                {date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </div>

              <WeatherIcon code={day.weather_code} size={36} />

              <div className="day-card__temp">
                {Math.round(day.temperature_2m_min)}° /{" "}
                {Math.round(day.temperature_2m_max)}°
              </div>

              <div className="day-card__rain">
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
