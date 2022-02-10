import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import styles from "./Chart.module.scss";

const Chart = ({
  data,
  lineDataKey,
  xAxisDataKey,
  yAxisDomain,
  lineColor,
  legend,
}: {
  data:
    | { heartRate: number; timeDuration: number }[]
    | {
        HRV: number;
        timeDuration: number;
      }[]
    | { humidity: string; temp: string; time: string }[];
  lineDataKey: string;
  xAxisDataKey: string;
  yAxisDomain: number[];
  lineColor: string;
  legend: boolean;
}) => {
  console.log("yAxisDomain", yAxisDomain);
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
          style={{
            fontSize: "1.5rem",
          }}
        />
        <YAxis
          domain={yAxisDomain}
          style={{
            fontSize: "1.3rem",
          }}
        />
        {legend && <Legend />}
      </LineChart>
    </div>
  );
};

export default Chart;
