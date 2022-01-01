// import React, { useEffect } from "react";
// import moment from "moment";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import * as styles from "./Chart.module.scss";

const Chart = ({
  data,
  lineDataKey,
  xAxisDataKey,
  bedtimeStart,
  bedtimeEnd,
  yAxisDomain,
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
          dataKey={lineDataKey}
          stroke={lineColor}
          dot={false}
        />

        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxisDataKey}
          interval="preserveStartEnd"
          minTickGap={45}
          // domain={[bedtimeStart, bedtimeEnd]}
          style={{
            fontSize: "1.5rem",
          }}
        />
        <YAxis
          type="number"
          // minTickGap={5}
          // interval="preserveStartEnd"
          domain={yAxisDomain}
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
