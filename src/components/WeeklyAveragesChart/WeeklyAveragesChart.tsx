import styles from "./WeeklyAveragesChart.module.scss";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { WeeklyAveragesChartProps } from "../../types/dataTypes";

const WeeklyAveragesChart: React.FC<WeeklyAveragesChartProps> = ({
  data,
  showChartData,
}) => {
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
        {showChartData.restingHR && (
          <Line
            type="monotone"
            dataKey="restingHR"
            stroke="#dc143c"
            dot={false}
          />
        )}

        {showChartData.avgHRV && (
          <Line type="monotone" dataKey="avgHRV" stroke="#808080" dot={false} />
        )}

        {showChartData.avgBedroomTemp && (
          <Line
            type="monotone"
            dataKey="avgBedroomTemp"
            stroke="#303ead"
            dot={false}
          />
        )}

        {showChartData.avgHumidity && (
          <Line
            type="monotone"
            dataKey="avgHumidity"
            stroke="#33becc"
            dot={false}
          />
        )}

        <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
        <XAxis
          dataKey="date"
          minTickGap={25}
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
