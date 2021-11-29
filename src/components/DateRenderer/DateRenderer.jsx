import React, { useContext } from "react";
import Button from "../Button/Button";
import { GlobalContext } from "../../context/Provider";

const DateRenderer = ({ todaysData, setTodaysData }) => {
  const { sleepData } = useContext(GlobalContext);

  const pickSleepDate = sleepData.map((data) => {
    const date = data.summary_date.slice(5);

    return (
      <div key={`btn: ${date}`} style={{ width: "100%" }}>
        <Button
          btnAction={date}
          onClick={() => setTodaysData({ date, data })}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            backgroundColor: todaysData === date && "#66becc",
          }}
        />
      </div>
    );
  });

  return (
    <div
      style={{
        width: "100%",
        marginTop: "2rem",
        padding: "0 1rem",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {pickSleepDate}
    </div>
  );
};

export default DateRenderer;
