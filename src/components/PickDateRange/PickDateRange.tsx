import styles from "./PickDateRange.module.scss";
import { PickDateRangeProps } from "../../types/dataTypes";

const PickDateRange: React.FC<PickDateRangeProps> = ({
  weeklyAverages,
  setStartDate,
  setEndDate,
}) => {
  const dates = weeklyAverages.map((obj, idx) => {
    return (
      <option value={obj.fullDate} key={`${obj.date} #${idx}`}>
        {obj.fullDate}
      </option>
    );
  });

  const datesReversed = weeklyAverages
    .map((obj, idx) => {
      return (
        <option value={obj.fullDate} key={`${obj.date} #${idx}`}>
          {obj.fullDate}
        </option>
      );
    })
    .reverse();

  return (
    <div className={styles.pickDateRangeContainer}>
      <h2>Pick Date Range</h2>
      <div className={styles.pickDateRangeWrapper}>
        <div className={styles.startDateWrapper}>
          <p className={styles.startDateText}>Start Date:</p>
          <select
            className={styles.selectStartDates}
            onChange={(e) => setStartDate(e.target.value)}
          >
            {dates}
          </select>
        </div>
        <div className={styles.endDateWrapper}>
          <p className={styles.endDateText}>End Date:</p>
          <select
            className={styles.selectEndDates}
            onChange={(e) => setEndDate(e.target.value)}
          >
            {datesReversed}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PickDateRange;
