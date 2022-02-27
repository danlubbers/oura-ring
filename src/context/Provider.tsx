import { FC, createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";
import {
  UserProps,
  TodaysProps,
  ReadinessProps,
  SleepProps,
  ActivityProps,
} from "../types/dataTypes";
import {
  userInitialStateData,
  todaysInitialStateData,
} from "../initialState/initialState";

interface GlobalContextProps {
  userData: UserProps;
  readinessData: ReadinessProps[];
  sleepData: SleepProps[];
  activityData: ActivityProps[];
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  todaysData: TodaysProps;
  setTodaysData: (todaysData: TodaysProps) => void;
  isMobileDisplay: boolean;
  setIsMobileDisplay: (isMobile: boolean) => void;
  btnOffsetLeft: number;
  setBtnOffsetLeft: (offsetLeft: number) => void;
  isBtnPosition: boolean;
  setIsBtnPosition: (isBtnPosition: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  userData: userInitialStateData,
  readinessData: [],
  sleepData: [],
  activityData: [],
  startDate: "",
  setStartDate: () => "",
  endDate: "",
  setEndDate: () => "",
  todaysData: todaysInitialStateData,
  setTodaysData: () => {},
  isMobileDisplay: false,
  setIsMobileDisplay: () => false,
  btnOffsetLeft: 0,
  setBtnOffsetLeft: () => 0,
  isBtnPosition: true,
  setIsBtnPosition: () => true,
});

const GlobalProvider: FC = ({ children }) => {
  const [userData, setUserData] = useState<UserProps>(userInitialStateData);
  const [readinessData, setReadinessData] = useState<ReadinessProps[]>([]);
  const [sleepData, setSleepData] = useState<SleepProps[]>([]);
  const [activityData, setActivityData] = useState<ActivityProps[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [todaysData, setTodaysData] = useState<TodaysProps>(
    todaysInitialStateData
  );
  const [isMobileDisplay, setIsMobileDisplay] = useState<boolean>(false);
  const [btnOffsetLeft, setBtnOffsetLeft] = useState<number>(0);
  const [isBtnPosition, setIsBtnPosition] = useState<boolean>(true);

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

      const todaysSleepDate: string = sleepData[
        sleepData.length - 1
      ].bedtime_end.slice(0, 10);

      const todaysSleepData: SleepProps = sleepData[sleepData.length - 1];
      const todaysReadinessData: ReadinessProps =
        readinessData[readinessData.length - 1];
      const todaysActivityData: ActivityProps =
        activityData[activityData.length - 1];

      // console.log("todaysSleepData", sleepData[sleepData.length - 1]);
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
