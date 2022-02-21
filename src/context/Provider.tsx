import { createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";
import { ReadinessProps, SleepProps, ActivityProps } from "../types/dataTypes";

type UserProps = {
  age: number;
  email: string;
  gender: string;
  height: number;
  weight: number;
};

type TodaysProps = {
  date: string;
  bedtimeStart: string;
  bedtimeEnd: string;

  data: {
    readiness: ReadinessProps;
    sleep: SleepProps;
    activity: ActivityProps;
  };
};

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
  userData: {
    age: 0,
    email: "",
    gender: "",
    height: 0,
    weight: 0,
  },
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
      readiness: {
        period_id: 0,
        rest_mode_state: 0,
        score: 0,
        score_activity_balance: 0,
        score_hrv_balance: 0,
        score_previous_day: 0,
        score_previous_night: 0,
        score_recovery_index: 0,
        score_resting_hr: 0,
        score_sleep_balance: 0,
        score_temperature: 0,
        summary_date: "",
      },
      sleep: {
        awake: 0,
        bedtime_end: "",
        bedtime_end_delta: 0,
        bedtime_start: "",
        bedtime_start_delta: 0,
        breath_average: 0,
        deep: 0,
        duration: 0,
        efficiency: 0,
        hr_5min: [],
        hr_average: 0,
        hr_lowest: 0,
        hypnogram_5min: "",
        is_longest: 0,
        light: 0,
        midpoint_at_delta: 0,
        midpoint_time: 0,
        onset_latency: 0,
        period_id: 0,
        rem: 0,
        restless: 0,
        rmssd: 0,
        rmssd_5min: [],
        score: 0,
        score_alignment: 0,
        score_deep: 0,
        score_disturbances: 0,
        score_efficiency: 0,
        score_latency: 0,
        score_rem: 0,
        score_total: 0,
        summary_date: "",
        temperature_delta: 0,
        temperature_deviation: 0,
        temperature_trend_deviation: 0,
        timezone: 0,
        total: 0,
      },
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
  btnOffsetLeft: 0,
  setBtnOffsetLeft: () => 0,
  isBtnPosition: true,
  setIsBtnPosition: () => true,
});

// Figure out the fix for TS children so it's not set to "any"
const GlobalProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<UserProps>({
    age: 0,
    email: "",
    gender: "",
    height: 0,
    weight: 0,
  });
  const [readinessData, setReadinessData] = useState<ReadinessProps[]>([]);
  const [sleepData, setSleepData] = useState<SleepProps[]>([]);
  const [activityData, setActivityData] = useState<ActivityProps[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [todaysData, setTodaysData] = useState<TodaysProps>({
    date: "",
    bedtimeStart: "",
    bedtimeEnd: "",
    data: {
      readiness: {
        period_id: 0,
        rest_mode_state: 0,
        score: 0,
        score_activity_balance: 0,
        score_hrv_balance: 0,
        score_previous_day: 0,
        score_previous_night: 0,
        score_recovery_index: 0,
        score_resting_hr: 0,
        score_sleep_balance: 0,
        score_temperature: 0,
        summary_date: "",
      },
      sleep: {
        awake: 0,
        bedtime_end: "",
        bedtime_end_delta: 0,
        bedtime_start: "",
        bedtime_start_delta: 0,
        breath_average: 0,
        deep: 0,
        duration: 0,
        efficiency: 0,
        hr_5min: [],
        hr_average: 0,
        hr_lowest: 0,
        hypnogram_5min: "",
        is_longest: 0,
        light: 0,
        midpoint_at_delta: 0,
        midpoint_time: 0,
        onset_latency: 0,
        period_id: 0,
        rem: 0,
        restless: 0,
        rmssd: 0,
        rmssd_5min: [],
        score: 0,
        score_alignment: 0,
        score_deep: 0,
        score_disturbances: 0,
        score_efficiency: 0,
        score_latency: 0,
        score_rem: 0,
        score_total: 0,
        summary_date: "",
        temperature_delta: 0,
        temperature_deviation: 0,
        temperature_trend_deviation: 0,
        timezone: 0,
        total: 0,
      },
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
