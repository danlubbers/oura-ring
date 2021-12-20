import React from "react";
import * as styles from "./BarChart.module.scss";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { secondsToHm } from "../../utilities/convertTime";

const BarChartComponent = ({
  totalSleep,
  timeInBed,
  bedtimeStart,
  bedtimeEnd,
  data,
  sleepStagesData,
}) => {
  console.log(`sleepStagesData`, sleepStagesData);

  const sleepStages = sleepStagesData.map(
    ({ stage, sleepSeconds, percentage }, idx) => {
      return (
        <div className={styles.sleepStagesWrapper} key={`${stage}-${idx}`}>
          <div className={styles.sleepStagesWrapper}>
            <div
              style={{
                width: `${percentage}%`,
              }}
              className={[styles.line]}
            />
          </div>
          <span className={styles.sleepStageText}>{stage}</span>
          <span className={styles.sleepStageTime}>
            {secondsToHm(sleepSeconds)}
          </span>
          <span className={styles.sleepStagePercentage}>{percentage}%</span>
        </div>
      );
    }
  );
  return (
    <div className={styles.barChartContainer}>
      <div className={styles.sleepTextWrapper}>
        <p className={styles.timeAsleepText}>
          Time asleep:
          <span className={styles.timeAsleepNum}>{totalSleep}</span>
        </p>
        <div className={styles.totalDurationWrapper}>
          <span className={styles.totalDurationText}>Total duration:</span>
          <span className={styles.totalDurationRNum}>{timeInBed}</span>
        </div>
      </div>

      <AreaChart
        width={350}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -30,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="timeDuration"
          interval="preserveStartEnd"
          minTickGap={45}
          domain={[bedtimeStart, bedtimeEnd]}
          style={{
            fontSize: "1.5rem",
          }}
        />
        <YAxis tickCount="4" domain={[1, 4]} />
        <Area
          type="monotone"
          dataKey="sleepData.sleepLevel"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
      <div className={styles.sleepStagesContainer}>{sleepStages}</div>
    </div>
  );
};

export default BarChartComponent;
