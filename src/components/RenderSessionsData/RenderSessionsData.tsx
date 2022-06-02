import { useContext } from "react";
import styles from "./RenderSessionsData.module.scss";
import { GlobalContext } from "../../context/Provider";
import { getAverages } from "../../utilities/getAverages";

const RenderSessionsData = () => {
  const {
    todaysData: {
      data: { sessions },
    },
  } = useContext(GlobalContext);

  const sessionsText = sessions?.sessionData.map(
    (
      { start_datetime, end_datetime, heart_rate, heart_rate_variability },
      idx
    ) => {
      const startTime = start_datetime.slice(11, 16);
      const startTimeInSeconds = new Date(start_datetime).getTime() / 1000;
      const endTimeInSeconds = new Date(end_datetime).getTime() / 1000;
      const duration = Math.floor(endTimeInSeconds - startTimeInSeconds) / 60;
      const durationNumberConverstion = Math.round(duration);

      const avgHRData = getAverages(heart_rate.items);
      const avgHRVData = getAverages(heart_rate_variability.items);

      return (
        <div className={styles.sessionsWrapper} key={idx}>
          <p className={styles.startTime}>{startTime}</p>
          <p>{durationNumberConverstion}m</p>
          <p>{Math.round(avgHRData)} bpm</p>
          <p>{Math.round(avgHRVData)} ms</p>
        </div>
      );
    }
  );

  return (
    <div className={styles.sessionsContainer}>
      <h2 className={styles.sessionsHeadline}>Meditation Sessions:</h2>
      {sessionsText}
    </div>
  );
};

export default RenderSessionsData;
