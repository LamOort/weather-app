import "./WeatherSkeleton.scss";

export const CurrentWeatherSkeleton = () => {
  return (
    <div className="weather-skeleton weather-skeleton--current">
      <div className="weather-skeleton__header">
        <div className="weather-skeleton__block weather-skeleton__block--title"></div>
        <div className="weather-skeleton__block weather-skeleton__block--subtitle"></div>
      </div>
      
      <div className="weather-skeleton__main">
        <div className="weather-skeleton__block weather-skeleton__block--temp"></div>
        <div className="weather-skeleton__info">
          <div className="weather-skeleton__block weather-skeleton__block--desc"></div>
          <div className="weather-skeleton__block weather-skeleton__block--feels"></div>
        </div>
      </div>
      
      <div className="weather-skeleton__stats">
        <div className="weather-skeleton__block weather-skeleton__block--stat"></div>
        <div className="weather-skeleton__block weather-skeleton__block--stat"></div>
      </div>
    </div>
  );
};

export const DailyForecastSkeleton = () => {
  return (
    <div className="weather-skeleton weather-skeleton--daily">
      <div className="weather-skeleton__block weather-skeleton__block--daily-title"></div>
      
      <div className="weather-skeleton__daily-cards">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="weather-skeleton__daily-card">
            <div className="weather-skeleton__block weather-skeleton__block--card-sm"></div>
            <div className="weather-skeleton__block weather-skeleton__block--card-icon"></div>
            <div className="weather-skeleton__block weather-skeleton__block--card-sm"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
