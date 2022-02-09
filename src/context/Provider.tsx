import { createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";

interface GlobalContextProps {
  userData: {};
  readinessData: any;
  sleepData: any;
  activityData: any;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  todaysData: {};
  setTodaysData: (
    date: string,
    bedtimeStart: string,
    bedtimeEnd: string,

    data: {
      readiness: {};
      sleep: {};
      activity: {};
    }
  ) => void;
  isMobileDisplay: boolean;
  setIsMobileDisplay: (isMobile: boolean) => void;
  btnOffsetLeft: boolean;
  setBtnOffsetLeft: (offset: boolean) => void;
  isBtnPosition: boolean;
  setIsBtnPosition: (isBtnPosition: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  userData: {},
  readinessData: [],
  sleepData: [],
  activityData: [],
  startDate: "",
  setStartDate: () => "",
  endDate: "",
  setEndDate: () => "",
  todaysData: {},
  setTodaysData: () => {},
  isMobileDisplay: false,
  setIsMobileDisplay: () => false,
  btnOffsetLeft: false,
  setBtnOffsetLeft: () => false,
  isBtnPosition: true,
  setIsBtnPosition: () => true,
});

// Figure out the fix for TS children so it's not set to "any"
const GlobalProvider = ({ children }: any) => {
  const [userData, setUserData] = useState([]);
  const [readinessData, setReadinessData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [todaysData, setTodaysData] = useState({});
  const [isMobileDisplay, setIsMobileDisplay] = useState(false);
  const [btnOffsetLeft, setBtnOffsetLeft] = useState(false);
  const [isBtnPosition, setIsBtnPosition] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOuraData();

      const userData = data?.ouraUserData.data;
      const readinessData = data?.ouraReadinessData.data.readiness;
      const sleepData = data?.ouraSleepData.data.sleep;
      const activityData = data?.ouraActivityData.data.activity;

      const startDate = String(new Date(sleepData[0].bedtime_end)).slice(0, 15);
      const endDate = String(
        new Date(sleepData[sleepData.length - 1].bedtime_end)
      ).slice(4, 15);

      const todaysSleepDate = sleepData[sleepData.length - 1].bedtime_end.slice(
        0,
        10
      );

      const todaysSleepData = sleepData[sleepData.length - 1];
      const todaysReadinessData = readinessData[readinessData.length - 1];
      const todaysActivityData = activityData[activityData.length - 1];
      const bedtimeStart = todaysSleepData.bedtime_start;
      const bedtimeEnd = todaysSleepData.bedtime_end;
      // console.log("PROVIDER: ", bedtimeEnd);

      setUserData(userData);
      setReadinessData(readinessData);
      setSleepData(sleepData);
      setActivityData(activityData);

      setStartDate(startDate);
      setEndDate(endDate);

      setTodaysData({
        date: todaysSleepDate,
        bedtimeStart,
        bedtimeEnd,

        data: {
          readiness: todaysReadinessData,
          sleep: todaysSleepData,
          activity: todaysActivityData,
        },
      });
    };
    fetchData();
  }, [setUserData, setSleepData]);
  // console.log(`Provider: todaysData`, todaysData);

  return (
    <GlobalContext.Provider
      value={{
        userData,
        readinessData,
        sleepData,
        activityData,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        todaysData,
        setTodaysData,
        isMobileDisplay,
        setIsMobileDisplay,
        btnOffsetLeft,
        setBtnOffsetLeft,
        isBtnPosition,
        setIsBtnPosition,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
