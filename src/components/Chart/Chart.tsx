import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import styles from "./Chart.module.scss";
import { ChartProps } from "../../types/dataTypes";

const Chart: React.FC<ChartProps> = ({
  chartTitle,
  data,
  lineDataKey,
  xAxisDataKey,
  yAxisDomain,
  lineColor,
  legend,
}) => {
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
