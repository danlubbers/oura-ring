import React, { useContext } from "react";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import { GlobalContext } from "../context/Provider";

function SleepData() {
  const { ouraData } = useContext(GlobalContext);
  const sleepData = ouraData?.ouraSleepData?.data.sleep;

  console.log(`sleepData`, sleepData);
  const prevNightsData = sleepData?.[sleepData?.length - 1];
  const summaryDate = prevNightsData?.summary_date;

  const bedtimeStart = new Date(
    prevNightsData?.bedtime_start
  ).toLocaleTimeString();
  const bedtimeEnd = new Date(prevNightsData?.bedtime_end).toLocaleTimeString();
  // console.log(`bedtimeStart`, bedtimeStart);
  // console.log(`bedtimeEnd`, bedtimeEnd);
  const lowestHR = prevNightsData?.hr_lowest;
  const heartRateData = prevNightsData?.hr_5min.map((hr, idx) => {
    return (
      <div key={idx}>
        <span>{hr}</span>
      </div>
    );
  });

  const avgHRData = prevNightsData?.hr_5min.reduce(
    (avg, value, _, { length }) => {
      return avg + value / length;
    },
    0
  );

  console.log(Math.round(avgHRData));
  // const hrvData = prevNightsData?.rmssd_5min.sort().map((hr, idx) => {
  //   return (
  //     <div key={idx}>
  //       <span>{hr}</span>
  //     </div>
  //   );
  // });
  return (
    <div>
      <RenderSleepData
        bedtimeStart={bedtimeStart}
        bedtimeEnd={bedtimeEnd}
        summaryDate={summaryDate}
        lowestHR={lowestHR}
        heartRateData={heartRateData}
        avgHRData={avgHRData}
      />
    </div>
  );
}

export default SleepData;
