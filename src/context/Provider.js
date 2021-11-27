import { createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [readinessData, setReadinessData] = useState([]);
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOuraData();

      const userData = data?.ouraUserData?.data;
      const readinessData = data?.ouraReadinessData?.data?.readiness;
      const sleepData = data?.ouraSleepData?.data.sleep;

      setUserData(userData);
      setReadinessData(readinessData);
      setSleepData(sleepData);
    };
    fetchData();
  }, [setUserData, setSleepData]);

  return (
    <GlobalContext.Provider value={{ userData, readinessData, sleepData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
