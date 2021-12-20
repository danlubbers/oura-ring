import React from "react";
import * as styles from "./BarChart.module.scss";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const BarChartComponent = ({ data, legend, bedtimeStart, bedtimeEnd }) => {
  return (
    <div className={styles.barChartContainer}>
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
          dataKey="sleepLevel"
          stroke="#8884d8"
          fill="#8884d8"
        />
        {/* <Area
          type="monotone"
          dataKey="sleepLevel"
          stroke="#dc143c"
          fill="#dc143c"
        /> */}
        {/* <Area
          type="monotone"
          dataKey="three"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="four"
          stackId="1"
          stroke="#33becc"
          fill="#33becc"
        /> */}
      </AreaChart>
    </div>
  );
};

export default BarChartComponent;
