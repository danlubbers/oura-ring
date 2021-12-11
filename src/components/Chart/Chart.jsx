// import React, { useEffect } from "react";
// import moment from "moment";
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

  // console.log(`!!!bedStart!!!`, bedtimeStart);
  // console.log(`!!!bedEnd!!!`, bedtimeEnd);

  // const formatXAxis = (bedtimeStart) => {
  //   return bedtimeStart;
  // };

  return (
    <div className={styles.chartContainer}>
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
          dataKey="timeDuration"
          interval="preserveStartEnd"
          minTickGap={45}
          domain={[bedtimeStart, bedtimeEnd]}
          style={{
            fontSize: "1.5rem",
          }}
        />
        <YAxis
          // type="number"code
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
