import { createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [readinessData, setReadinessData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [todaysData, setTodaysData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOuraData();

      const userData = data.ouraUserData.data;
      const readinessData = data.ouraReadinessData.data.readiness;
      const sleepData = data.ouraSleepData.data.sleep;
      const activityData = data.ouraActivityData.data.activity;
      console.log(`activityData`, activityData);

      const todaysSleepDate = sleepData[sleepData.length - 1].bedtime_end.slice(
        5,
        10
      );

      const todaysSleepData = sleepData[sleepData.length - 1];
      const todaysReadinessData = readinessData[readinessData.length - 1];

      setUserData(userData);
      setReadinessData(readinessData);
      setSleepData(sleepData);
      setTodaysData({
        date: todaysSleepDate,
        data: { readiness: todaysReadinessData, sleep: todaysSleepData },
      });
    };
    fetchData();
  }, [setUserData, setSleepData]);
  // console.log(`Provider: todaysData`, todaysData);

  return (
    <GlobalContext.Provider
      value={{ userData, readinessData, sleepData, todaysData, setTodaysData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
