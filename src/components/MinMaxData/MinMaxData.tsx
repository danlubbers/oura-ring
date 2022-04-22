import React from "react";
import styles from "./MinMaxData.module.scss";
import { MinMaxDataProps } from "../../types/dataTypes";

const MinMaxData: React.FC<MinMaxDataProps> = ({
  temperature,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
}) => {
  return (
    <div className={styles.minMaxWrapper}>
      <div className={styles.maxData}>
        <span className={styles.maxDataText}>
          Max {temperature ? "Temp:" : "Humidity:"}{" "}
        </span>
        <span data-testid="max-data" className={styles.maxDataNum}>
          {temperature ? `${maxTemp}°` : `${maxHumidity}%`}
        </span>
      </div>

      <div className={styles.minData}>
        <span className={styles.minDataText}>
          Min {temperature ? "Temp:" : "Humidity:"}{" "}
        </span>
        <span data-testid="min-data" className={styles.minDataNum}>
          {temperature ? `${minTemp}°` : `${minHumidity}%`}
        </span>
      </div>
    </div>
  );
};

export default MinMaxData;
