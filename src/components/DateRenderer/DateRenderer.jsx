import React, { useContext } from "react";
import * as styles from "./DateRenderer.module.scss";
import Button from "../Button/Button";
import { GlobalContext } from "../../context/Provider";

const DateRenderer = ({ todaysDate, setTodaysData, readiness }) => {
  const { readinessData, sleepData } = useContext(GlobalContext);

  const pickSleepDate = sleepData.map((todaysData, idx) => {
    // Added because Readiness uses "both" readinessData and sleepData
    const combinedData = {
      readiness: readinessData[idx],
      sleep: sleepData[idx],
    };

    const date = todaysData.bedtime_end.slice(5, 10);

    return (
      <div key={`btn: ${date}`} style={{ width: "100%" }}>
        <Button
          btnAction={date}
          onClick={() =>
            setTodaysData(
              readiness
                ? { date, data: combinedData }
                : { date, data: todaysData }
            )
          }
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            backgroundColor: todaysDate === date && "#66becc",
          }}
        />
      </div>
    );
  });

  return <div className={styles.dateRendererContainer}>{pickSleepDate}</div>;
};

export default DateRenderer;
