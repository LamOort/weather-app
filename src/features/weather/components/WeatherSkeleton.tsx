import styles from "./WeatherSkeleton.module.scss";

export const CurrentWeatherSkeleton = () => {
  return (
    <div className={`${styles.skeleton} ${styles.current}`}>
      <div className={styles.header}>
        <div className={`${styles.block} ${styles.title}`}></div>
        <div className={`${styles.block} ${styles.subtitle}`}></div>
      </div>
      
      <div className={styles.main}>
        <div className={`${styles.block} ${styles.temp}`}></div>
        <div className={styles.info}>
          <div className={`${styles.block} ${styles.desc}`}></div>
          <div className={`${styles.block} ${styles.feels}`}></div>
        </div>
      </div>
      
      <div className={styles.stats}>
        <div className={`${styles.block} ${styles.stat}`}></div>
        <div className={`${styles.block} ${styles.stat}`}></div>
      </div>
    </div>
  );
};

export const DailyForecastSkeleton = () => {
  return (
    <div className={`${styles.skeleton} ${styles.daily}`}>
      <div className={`${styles.block} ${styles.dailyTitle}`}></div>
      
      <div className={styles.dailyCards}>
        {[...Array(7)].map((_, i) => (
          <div key={i} className={styles.dailyCard}>
            <div className={`${styles.block} ${styles.cardSm}`}></div>
            <div className={`${styles.block} ${styles.cardIcon}`}></div>
            <div className={`${styles.block} ${styles.cardSm}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
