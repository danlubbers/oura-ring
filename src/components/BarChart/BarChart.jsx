import React from "react";
import styles from "./BarChart.module.scss";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import SleepStages from "../Stages/Stages";

const BarChartComponent = ({
  sleep,
  activity,
  totalSleep,
  timeInBed,
  // bedtimeStart,
  // bedtimeEnd,
  data,
  dataKey,
  XAxisDataKey,
  domain,
  sleepStagesData,
  activityStagesData,
}) => {
  return (
    <div className={styles.barChartContainer}>
      {sleep && (
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
      )}

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
          dataKey={XAxisDataKey}
          interval="preserveStartEnd"
          minTickGap={45}
          // domain={[bedtimeStart, bedtimeEnd]}
          style={{
            fontSize: "1.5rem",
          }}
        />
        <YAxis tickCount="4" domain={domain} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>

      {sleep && <SleepStages stagesData={sleepStagesData} />}
      {activity && <SleepStages stagesData={activityStagesData} />}
    </div>
  );
};

export default BarChartComponent;
