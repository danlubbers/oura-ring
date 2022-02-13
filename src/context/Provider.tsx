import { createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";

type activityProps = {
  average_met: number;
  cal_active: number;
  cal_total: number;
  class_5min: string;
  daily_movement: number;
  day_end: string;
  day_start: string;
  high: number;
  inactive: number;
  inactivity_alerts: number;
  low: number;
  medium: number;
  met_1min: number[];
  met_min_high: number;
  met_min_inactive: number;
  met_min_low: number;
  met_min_medium: number;
  non_wear: number;
  rest: number;
  rest_mode_state: number;
  score: number;
  score_meet_daily_targets: number;
  score_move_every_hour: number;
  score_recovery_time: number;
  score_stay_active: number;
  score_training_frequency: number;
  score_training_volume: number;
  steps: number;
  summary_date: string;
  target_calories: number;
  target_km: number;
  target_miles: number;
  timezone: number;
  to_target_km: number;
  to_target_miles: number;
  total: number;
};

interface GlobalContextProps {
  userData: {};
  readinessData: any;
  sleepData: any;
  activityData: any;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  todaysData: {
    date: string;
    bedtimeStart: string;
    bedtimeEnd: string;

    data: {
      readiness: any;
      sleep: any;
      activity: activityProps;
    };
  };
  setTodaysData: (
    date: any,
    bedtimeStart: string,
    bedtimeEnd: string,

    data: {
      readiness: any;
      sleep: any;
      activity: activityProps;
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
  todaysData: {
    date: "",
    bedtimeStart: "",
    bedtimeEnd: "",
    data: {
      readiness: {},
      sleep: {},
      activity: {
        average_met: 0,
        cal_active: 0,
        cal_total: 0,
        class_5min: "",
        daily_movement: 0,
        day_end: "",
        day_start: "",
        high: 0,
        inactive: 0,
        inactivity_alerts: 0,
        low: 0,
        medium: 0,
        met_1min: [],
        met_min_high: 0,
        met_min_inactive: 0,
        met_min_low: 0,
        met_min_medium: 0,
        non_wear: 0,
        rest: 0,
        rest_mode_state: 0,
        score: 0,
        score_meet_daily_targets: 0,
        score_move_every_hour: 0,
        score_recovery_time: 0,
        score_stay_active: 0,
        score_training_frequency: 0,
        score_training_volume: 0,
        steps: 0,
        summary_date: "",
        target_calories: 0,
        target_km: 0,
        target_miles: 0,
        timezone: 0,
        to_target_km: 0,
        to_target_miles: 0,
        total: 0,
      },
    },
  },
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
  const [todaysData, setTodaysData] = useState({
    date: "",
    bedtimeStart: "",
    bedtimeEnd: "",
    data: {
      readiness: {},
      sleep: {},
      activity: {
        average_met: 0,
        cal_active: 0,
        cal_total: 0,
        class_5min: "",
        daily_movement: 0,
        day_end: "",
        day_start: "",
        high: 0,
        inactive: 0,
        inactivity_alerts: 0,
        low: 0,
        medium: 0,
        met_1min: [],
        met_min_high: 0,
        met_min_inactive: 0,
        met_min_low: 0,
        met_min_medium: 0,
        non_wear: 0,
        rest: 0,
        rest_mode_state: 0,
        score: 0,
        score_meet_daily_targets: 0,
        score_move_every_hour: 0,
        score_recovery_time: 0,
        score_stay_active: 0,
        score_training_frequency: 0,
        score_training_volume: 0,
        steps: 0,
        summary_date: "",
        target_calories: 0,
        target_km: 0,
        target_miles: 0,
        timezone: 0,
        to_target_km: 0,
        to_target_miles: 0,
        total: 0,
      },
    },
  });
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

      console.log("todaysActivityData", activityData[activityData.length - 1]);
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
