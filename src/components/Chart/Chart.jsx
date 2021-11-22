// import React, { useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import * as styles from "./Chart.module.scss";

const Chart = ({ data, filterOutZeros }) => {
  console.log(`data`, data);
  const nightTimeHR = data?.hr_5min;
  // console.log(`nightTimeHR`, nightTimeHR);
  // const fiveMinIncrements = nightTimeHR?.length;
  // console.log(`fiveMinIncrements`, fiveMinIncrements);
  // const duration = data?.duration;
  // console.log(`duration`, duration / 60 / 60);
  // console.log(`filterOutZeros`, filterOutZeros);

  const heartRateDataObj = filterOutZeros?.map((heartRate, idx) => {
    console.log(`heartRate`, heartRate);
    return {
      "heart-rate": heartRate,
      "time-duration": idx,
    };
  });

  // console.log(`heartRateDataObj`, Array.isArray(heartRateDataObj));
  // console.log(`heartRateDataObj`, heartRateDataObj);

  // const testData = [
  //   { time: 1, test: 100 },
  //   { time: 2, test: 200 },
  //   { time: 3, test: 100 },
  //   { time: 4, test: 400 },
  //   { time: 5, test: 100 },
  //   { time: 6, test: 200 },
  //   { time: 7, test: 100 },
  //   { time: 8, test: 400 },
  //   { time: 9, test: 100 },
  //   { time: 10, test: 200 },
  //   { time: 11, test: 100 },
  //   { time: 12, test: 400 },
  // ];
  return (
    <div className={styles.chartContainer}>
      <LineChart
        width={350}
        height={200}
        data={heartRateDataObj}
        margin={{
          top: 5,
          right: 20,
          left: -30,
          bottom: 5,
        }}
      >
        <Line type="monotone" dataKey="heart-rate" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time-duration" />
        <YAxis />
        <Legend />
      </LineChart>
    </div>
  );
};

export default Chart;
