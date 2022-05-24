import { FC, createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";
import {
  GlobalContextProps,
  UserProps,
  TodaysProps,
  ReadinessProps,
  SleepProps,
  ActivityProps,
  HeartRateProps,
  MergedTagProps,
  MergedSessionProps,
} from "../types/dataTypes";
import {
  globalContextInitialState,
  userInitialStateData,
  todaysInitialStateData,
} from "../initialState/initialState";
import {
  mergedTagDataByDate,
  mergedSessionDataByDate,
} from "../utilities/mergeData";

export const GlobalContext = createContext<GlobalContextProps>(
  globalContextInitialState
);

const GlobalProvider: FC = ({ children }) => {
  const [userData, setUserData] = useState<UserProps>(userInitialStateData);
  const [readinessData, setReadinessData] = useState<ReadinessProps[]>([]);
  const [sleepData, setSleepData] = useState<SleepProps[]>([]);
  const [activityData, setActivityData] = useState<ActivityProps[]>([]);
  const [heartRateData, setHeartRateData] = useState<HeartRateProps[]>([]);
  const [mergedTagData, setMergedTagData] = useState<MergedTagProps[]>([]);
  const [mergedSessionData, setMergedSessionData] = useState<
    MergedSessionProps[]
  >([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [todaysData, setTodaysData] = useState<TodaysProps>(
    todaysInitialStateData
  );
  const [isMobileDisplay, setIsMobileDisplay] = useState<boolean>(false);
  const [btnOffsetLeft, setBtnOffsetLeft] = useState<number>(0);
  const [isBtnPosition, setIsBtnPosition] = useState<boolean>(true);

  // console.log("STATE: mergedSessionData", mergedSessionData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOuraData();
      // console.log("data", data);

      const userData = data?.ouraPersonalInfoData_V2.data.personalInfo;
      const readinessData = data?.ouraReadinessData.data.readiness;
      const sleepData = data?.ouraSleepData.data.sleep;
      const activityData = data?.ouraActivityData.data.activity;
      const heartRateData = data?.ouraHeartRateData_V2.data.heartRate;
      const tagData = data?.ouraTagData_V2.data.tags;
      const sessionData = data?.ouraSessionsData_V2.data.sessions;

      const mergedTagDataTest = mergedTagDataByDate(tagData);
      const mergedSessionDataTest = mergedSessionDataByDate(sessionData);
      // console.log("mergedSessionDataTest", mergedSessionDataTest);

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
      const todaysTagData: MergedTagProps =
        mergedTagData[mergedTagData.length - 1];

      /*** V2 data - Need to filter for day instead of V1 getting last in array ***/
      const todaysSessionDataFilter: MergedSessionProps[] =
        mergedSessionData.filter((data) => {
          console.log("data", data);
          return data;
          // day === sleepData[sleepData.length - 1].bedtime_end.slice(0, 10)
        });

      // console.log("todaysSessionDataFilter", todaysSessionDataFilter);

      const todaysSessionData: MergedSessionProps =
        mergedSessionData[mergedSessionData.length - 1];

      // const todaysHeartRateData: HeartRateProps =
      //   heartRateData[heartRateData.length - 1];

      // console.log("todaysSleepData", sleepData[sleepData.length - 1]);
      const bedtimeStart = todaysSleepData.bedtime_start;
      const bedtimeEnd = todaysSleepData.bedtime_end;
      // console.log("PROVIDER: ", bedtimeEnd);

      setUserData(userData);
      setReadinessData(readinessData);
      setSleepData(sleepData);
      setActivityData(activityData);
      setHeartRateData(heartRateData);
      setMergedTagData(mergedTagDataTest);
      setMergedSessionData(mergedSessionDataTest);

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
          tags: todaysTagData,
          sessions: todaysSessionData,
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
        mergedTagData,
        mergedSessionData,
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
