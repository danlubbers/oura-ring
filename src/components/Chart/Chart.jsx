// import React, { useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import * as styles from "./Chart.module.scss";

const Chart = ({ data, dataKey, chartTitle, min, max, lineColor }) => {
  console.log(`data`, data);

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
        <XAxis dataKey="timeDuration" />
        <YAxis type="number" domain={[min - 5, max + 5]} />
        <Legend />
      </LineChart>
    </div>
  );
};

export default Chart;
