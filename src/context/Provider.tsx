import { FC, createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";
import {
  GlobalContextProps,
  UserProps,
  TodaysProps,
  ReadinessProps,
  SleepProps,
  ActivityProps,
  MergedHeartRateProps,
  MergedTagProps,
  MergedSessionProps,
  MergedWorkoutProps,
} from "../types/dataTypes";
import {
  globalContextInitialState,
  userInitialStateData,
  todaysInitialStateData,
} from "../initialState/initialState";
import {
  mergedHeartRateDataByDate,
  mergedTagDataByDate,
  mergedSessionDataByDate,
  mergedWorkoutDataByDate,
} from "../utilities/mergeData";
import { findDataByDate } from "../utilities/findDatabyDate";

export const GlobalContext = createContext<GlobalContextProps>(
  globalContextInitialState
);

const GlobalProvider: FC = ({ children }) => {
  const [userData, setUserData] = useState<UserProps>(userInitialStateData);
  const [readinessData, setReadinessData] = useState<ReadinessProps[]>([]);
  const [sleepData, setSleepData] = useState<SleepProps[]>([]);
  const [activityData, setActivityData] = useState<ActivityProps[]>([]);
  const [mergedHeartRateData, setMergedHeartRateData] = useState<
    MergedHeartRateProps[]
  >([]);
  const [mergedTagData, setMergedTagData] = useState<MergedTagProps[]>([]);
  const [mergedSessionData, setMergedSessionData] = useState<
    MergedSessionProps[]
  >([]);
  const [mergedWorkoutData, setMergedWorkoutData] = useState<
    MergedWorkoutProps[]
  >([]);
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

      const userData = data?.ouraPersonalInfoData_V2.data.personalInfo;
      const readinessData = data?.ouraReadinessData.data.readiness;
      const sleepData = data?.ouraSleepData.data.sleep;
      const activityData = data?.ouraActivityData.data.activity;
      const heartRateData = data?.ouraHeartRateData_V2.data.heartRate;
      const tagData = data?.ouraTagData_V2.data.tags;
      const sessionData = data?.ouraSessionsData_V2.data.sessions;
      const workoutData = data?.ouraWorkoutsData_V2.data.workouts;

      const heartRateDataByDate = mergedHeartRateDataByDate(heartRateData); // Oura API only gives HR data for today and yesterday...
      const tagDataByDate = mergedTagDataByDate(tagData);
      const sessionDataByDate = mergedSessionDataByDate(sessionData);
      const workoutDataByDate = mergedWorkoutDataByDate(workoutData);

      const startDate = String(new Date(sleepData[0].bedtime_end)).slice(0, 15);
      const endDate = String(new Date(sleepData.at(-1).bedtime_end)).slice(
        4,
        15
      );

      const todaysSleepDate: string = sleepData.at(-1).bedtime_end.slice(0, 10);

      // V1 API: Array of arrays
      const todaysSleepData: SleepProps = sleepData.at(-1);
      const todaysReadinessData: ReadinessProps = readinessData.at(-1);
      const todaysActivityData: ActivityProps = activityData.at(-1);
      // V2 API: Array of objects
      const todaysHeartRateData: MergedHeartRateProps =
        heartRateDataByDate[heartRateDataByDate.length - 1];
      const todaysWorkoutData: MergedWorkoutProps = findDataByDate(
        workoutData,
        todaysSleepDate
      );

      const bedtimeStart = todaysSleepData.bedtime_start;
      const bedtimeEnd = todaysSleepData.bedtime_end;

      setUserData(userData);
      setReadinessData(readinessData);
      setSleepData(sleepData);
      setActivityData(activityData);
      setMergedHeartRateData(heartRateDataByDate);
      setMergedTagData(tagDataByDate);
      setMergedSessionData(sessionDataByDate);
      setMergedWorkoutData(workoutDataByDate);

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
          heartRate: todaysHeartRateData,
          tags: undefined, // No data to retrieve from Oura Api for same day
          sessions: undefined, // No data to retrieve from Oura Api for same day
          workouts: todaysWorkoutData ? todaysWorkoutData : undefined, // There's not always data for todays workout
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
        mergedHeartRateData,
        mergedTagData,
        mergedSessionData,
        mergedWorkoutData,
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
