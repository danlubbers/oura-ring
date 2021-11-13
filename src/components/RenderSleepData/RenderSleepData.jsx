import { useEffect } from "react";
import * as styles from "./RenderSleepData.module.scss";
import getOuraData from "../../utilities/getOuraData";

const RenderUserData = ({ ouraSleepData, setOuraSleepData }) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOuraData();
      setOuraSleepData(data?.ouraSleepData.data.sleep);
    };
    fetchData();
  }, [setOuraSleepData]);

  const lastNightsData = ouraSleepData?.[ouraSleepData.length - 1];
  console.log(`lastNightsData`, lastNightsData);
  return (
    <div className={styles.renderSleepDataContainer}>
      <h1>Last Nights Sleep Data</h1>
      <p>{lastNightsData?.summary_date}</p>
      <p>Lowest Heart Rate: {lastNightsData?.hr_lowest} bpm</p>
    </div>
  );
};

export default RenderUserData;
