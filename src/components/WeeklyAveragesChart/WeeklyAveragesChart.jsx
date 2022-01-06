import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import * as styles from "./WeeklyAveragesChart.module.scss";

const WeeklyAveragesChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <LineChart
        width={340}
        height={350}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -35,
          bottom: 5,
        }}
      >
        <Line
          type="monotone"
          dataKey="restingHR"
          stroke="#dc143c"
          dot={false}
        />
        <Line type="monotone" dataKey="maxHRV" stroke="#808080" dot={false} />
        <Line type="monotone" dataKey="avgTemp" stroke="#303ead" dot={false} />
        <Line
          type="monotone"
          dataKey="avgHumidity"
          stroke="#33becc"
          dot={false}
        />

        <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
        <XAxis
          dataKey="date"
          interval="preserveStartEnd"
          style={{
            fontSize: "1.5rem",
          }}
        />
        <YAxis
          style={{
            fontSize: "1.1rem",
          }}
        />

        <Legend
          wrapperStyle={{
            position: "relative",
            fontSize: "1.2rem",
            marginLeft: "34px",
          }}
        />
      </LineChart>
    </div>
  );
};

export default WeeklyAveragesChart;
