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

      const todaysDate = sleepData[sleepData.length - 1].bedtime_end.slice(
        5,
        10
      );
      const todaysData = sleepData[sleepData.length - 1];

      setUserData(userData);
      setReadinessData(readinessData);
      setSleepData(sleepData);
      setTodaysData({ date: todaysDate, data: todaysData });
      // todo when going from readiness back to sleep data show's {readiness: with data, sleep: undefined!!!}
    };
    fetchData();
  }, [setUserData, setSleepData]);
  console.log(`todaysData`, todaysData);

  return (
    <GlobalContext.Provider
      value={{ userData, readinessData, sleepData, todaysData, setTodaysData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
