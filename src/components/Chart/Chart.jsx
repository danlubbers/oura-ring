// import React, { useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import * as styles from "./Chart.module.scss";

const Chart = ({
  data,
  dataKey,
  bedtimeStart,
  bedtimeEnd,
  chartTitle,
  min,
  max,
  lineColor,
  legend,
}) => {
  // console.log(`data`, data);

  const bedStart = bedtimeStart?.slice(0, 5);
  const bedEnd = bedtimeEnd?.slice(0, 5);
  console.log(`!!!bedStart!!!`, bedStart);
  return (
    <div className={styles.chartContainer}>
      <h2>{chartTitle}</h2>
      <LineChart
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
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          dot={false}
        />

        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="timeDuration"
          interval="preserveStartEnd"
          domain={[bedStart, bedEnd]}
          style={{
            fontSize: "1.5rem",
          }}
        />
        <YAxis
          type="number"
          interval="preserveStartEnd"
          domain={[min - 5 || 0, max + 5]}
          style={{
            fontSize: "1.5rem",
          }}
        />
        {legend && <Legend />}
      </LineChart>
    </div>
  );
};

export default Chart;
