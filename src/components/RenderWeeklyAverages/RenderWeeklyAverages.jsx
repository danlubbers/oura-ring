import React from "react";
import * as styles from "./RenderWeeklyAverages.module.scss";
import Container from "../Container/Container";

const RenderWeeklyAverages = ({ weeklyAverages }) => {
  const renderWeeklyAverages = weeklyAverages.map((obj, idx) => {
    console.log(`obj`, obj);
    return (
      <div key={`${idx}`} className={styles.weeklyAveragesContainer}>
        <p className={styles.dateText}>{obj.date}</p>
        <div className={styles.averagesWrapper}>
          <span>Lowest heart rate: </span>
          <span className={styles.renderedData}>{obj.restingHR} bpm</span>
        </div>
        <div className={styles.averagesWrapper}>
          <span>Max HRV: </span>
          <span className={styles.renderedData}>{obj.maxHRV} ms</span>
        </div>
        <div className={styles.averagesWrapper}>
          <span>Ambient Bedroom Temp: </span>
          <span className={styles.renderedData}>{obj.avgTemp} °F</span>
        </div>
        <div className={styles.averagesWrapper}>
          <span>Ambient Humidity: </span>
          <span className={styles.renderedData}>{obj.avgHumidity} %</span>
        </div>
      </div>
    );
  });

  return (
    <Container isFooter={false}>
      <p className={styles.weeklyAveragesText}>Weekly Averages</p>
      {renderWeeklyAverages}
    </Container>
  );
};

export default RenderWeeklyAverages;
