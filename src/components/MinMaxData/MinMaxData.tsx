import React from "react";
import styles from "./MinMaxData.module.scss";
import { MinMaxDataProps } from "../../types/dataTypes";

const MinMaxData: React.FC<MinMaxDataProps> = ({
  temperature,
  humidity,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
}) => {
  return (
    <div className={styles.minMaxWrapper}>
      {temperature ? (
        <div className={styles.maxData}>
          <span className={styles.maxDataText}>Max Temp: </span>
          <span data-testid="max-temp-data" className={styles.maxDataNum}>
            {maxTemp}°
          </span>
        </div>
      ) : (
        <div className={styles.maxData}>
          <span className={styles.maxDataText}>Max Humidity: </span>
          <span data-testid="max-humidity-data" className={styles.maxDataNum}>
            {maxHumidity}%
          </span>{" "}
        </div>
      )}

      {temperature ? (
        <div className={styles.minData}>
          <span className={styles.minDataText}>Min Temp: </span>
          <span data-testid="min-temp-data" className={styles.minDataNum}>
            {minTemp}°
          </span>
        </div>
      ) : (
        <div className={styles.minData}>
          <span className={styles.minDataText}>Min Humidity: </span>
          <span data-testid="min-humidity-data" className={styles.minDataNum}>
            {minHumidity}%
          </span>
        </div>
      )}
    </div>
  );
};

export default MinMaxData;
