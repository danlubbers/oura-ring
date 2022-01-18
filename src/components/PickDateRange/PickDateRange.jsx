import React from "react";
import * as styles from "./PickDateRange.module.scss";

const PickDateRange = ({ weeklyAverages }) => {
  const dates = weeklyAverages.map((obj, idx) => {
    return (
      <option value={obj.date} key={`${obj.date} #${idx}`}>
        {obj.date}
      </option>
    );
  });
  console.log(`dates`, dates);
  return (
    <div className={styles.pickDateRangeContainer}>
      <h2>Pick Date Range</h2>
      <div className={styles.pickDateRangeWrapper}>
        <div className={styles.startDateWrapper}>
          <p className={styles.startDateText}>Start Date:</p>
          <select className={styles.selectStartDates}>{dates}</select>
        </div>
        <div className={styles.endDateWrapper}>
          <p className={styles.endDateText}>End Date:</p>
          <select className={styles.selectEndDates}>{dates}</select>
        </div>
      </div>
    </div>
  );
};

export default PickDateRange;
