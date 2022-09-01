// GlobalContext
export interface GlobalContextProps {
  userData: UserProps;
  readinessData: ReadinessProps[];
  dailySleepData: DailySleepProps[];
  activityData: ActivityProps[];
  mergedHeartRateData: MergedHeartRateProps[];
  mergedTagData: MergedTagProps[];
  mergedSessionData: MergedSessionProps[];
  sleepPeriodData: SleepPeriodProps[];
  mergedWorkoutData: MergedWorkoutProps[];
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

// Token
export interface SetTokenProps {
  setToken?: (userToken: { token: string }) => void;
}

// Login
export interface LoginProps {
  handleUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  username: string;
  password: string;
  error: { usernameError: string | null; passwordError: string | null };
}

// User
export type UserProps = {
  age: number;
  email: string;
  biological_sex: string;
  height: number;
  weight: number;
};

// TodaysData
export type TodaysProps = {
  date: string;
  bedtimeStart: string;
  bedtimeEnd: string;

  data: {
    readiness: ReadinessProps;
    dailySleep: DailySleepProps;
    activity: ActivityProps;
    heartRate: MergedHeartRateProps | undefined;
    tags: MergedTagProps | undefined;
    sessions: MergedSessionProps | undefined;
    sleepPeriod: SleepPeriodProps;
    workouts: MergedWorkoutProps | undefined;
  };
};

// Readiness, Sleep, Activity, Tags & Sessions Props
export type ReadinessProps = {
  contributors: {
    activity_balance: number;
    body_temperature: number;
    hrv_balance: number;
    previous_day_activity: number;
    previous_night: number;
    recovery_index: number;
    resting_heart_rate: number;
    sleep_balance: number;
  };
  day: string;
  score: number;
  temperature_deviation: number;
  temperature_trend_deviation: number;
  timestamp: string;
};

export type DailySleepProps = {
  contributors: {
    deep_sleep: number;
    efficiency: number;
    latency: number;
    rem_sleep: number;
    restfulness: number;
    timing: number;
    total_sleep: number;
  };
  day: string;
  score: number;
  timestamp: string;
};

export type ActivityProps = {
  class_5_min: string;
  score: number;
  active_calories: number;
  average_met_minutes: number;
  contributors: {
    meet_daily_targets: number;
    move_every_hour: number;
    recovery_time: number;
    stay_active: number;
    training_frequency: number;
    training_volume: number;
  };
  equivalent_walking_distance: number;
  high_activity_met_minutes: number;
  high_activity_time: number;
  inactivity_alerts: number;
  low_activity_met_minutes: number;
  low_activity_time: number;
  medium_activity_met_minutes: number;
  medium_activity_time: number;
  met: {
    interval: number;
    items: number[];
    timestamp: string;
  };
  meters_to_target: number;
  non_wear_time: number;
  resting_time: number;
  sedentary_met_minutes: number;
  sedentary_time: number;
  steps: number;
  target_calories: number;
  target_meters: number;
  total_calories: number;
  day: string;
  timestamp: string;
};

export type HeartRateProps = {
  bpm: number;
  source: string;
  timestamp: string;
};
export type MergedHeartRateProps = {
  day: string;
  heartRateData: {
    bpm: number;
    source: string;
    timestamp: string;
  }[];
};

export type TagProps = {
  day: string;
  tags: string[];
  text: string;
  timestamp: string;
};

export type MergedTagProps = {
  day: string;
  tagData: TagProps[];
};

export type SessionArrayDataProps = {
  interval: number;
  items: number[];
  timestamp: string;
};

export type SessionProps = {
  day: string;
  start_datetime: string;
  end_datetime: string;
  mood: string | null;
  type: string;
  heart_rate: SessionArrayDataProps;
  heart_rate_variability: SessionArrayDataProps;
  motion_count: SessionArrayDataProps;
};

export type MergedSessionProps = {
  day: string;
  sessionData: SessionProps[];
};

export type SleepPeriodProps = {
  average_breath: number;
  average_heart_rate: number;
  average_hrv: number;
  awake_time: number;
  bedtime_end: string;
  bedtime_start: string;
  day: string;
  deep_sleep_duration: number;
  efficiency: number;
  heart_rate: {
    interval: number;
    items: number[];
    timestamp: string;
  };
  hrv: {
    interval: number;
    items: number[];
    timestamp: string;
  };
  latency: number;
  light_sleep_duration: number;
  low_battery_alert: boolean;
  lowest_heart_rate: number;
  movement_30_sec: string;
  period: number;
  readiness_score_delta: number;
  rem_sleep_duration: number;
  restless_periods: number;
  sleep_phase_5_min: string;
  sleep_score_delta: number;
  time_in_bed: number;
  total_sleep_duration: number;
  type: string;
};

export type WorkoutProps = {
  activity: string;
  calories: number;
  day: string;
  distance: number | null;
  end_datetime: string;
  intensity: string;
  label: null;
  source: string;
  start_datetime: string;
};

export type MergedWorkoutProps = {
  day: string;
  workoutData: WorkoutProps[];
};

// All Type Props for Components
export type ActivityContributorDataProps = {
  name: string;
  score: number;
  data?: number;
};

export type MetFiveMinArrayProps = {
  met: string;
  index: number;
};

export type ActivityStagesDataProps = {
  stage: string;
  seconds: number;
  percentage: number;
  showPercentage: boolean;
  color: string;
};

export type HeartDataProps = {
  heartRate: number;
  timeDuration: number;
};

export type HrvDataProps = { HRV: number; timeDuration: number };

export type ReadinessContributorDataProps = {
  name: string;
  score: number;
};

export type HypnogramDataProps = {
  sleepData: { sleepStage: string; sleepLevel: string };
  timeDuration: number;
};

export type SleepStagesDataProps = {
  stage: string;
  seconds: number;
  percentage: number;
  showPercentage: boolean;
  color: string;
};

export type SleepContributorDataProps = {
  name: string;
  score: number;
  data?: number;
  percentage?: number;
};

export interface RenderUserDataProps {
  isImperial: boolean;
  setUnits: (unit: string) => void;
  isMobileDisplay: boolean;
  handleClickMobileDisplay: () => void;
}

export type ShowChartDataProps = {
  restingHR: boolean;
  avgHRV: boolean;
  avgBedroomTemp: boolean;
  avgHumidity: boolean;
};

export type chosenDateRangeProps = {
  avgBedroomTemp: number;
  avgHumidity: number;
  bodyTemp: number;
  date: string;
  fullDate: string;
  avgHRV: number;
  restingHR: number;
};

export type WeekAveragesProps = {
  restingHR: number;
  avgHRV: number;
  bodyTemp: number;
  avgBedroomTemp: number;
  avgHumidity: number;
  fullDate: string;
  date: string;
};

// All Component Props
export interface BarChartProps {
  isSleep?: boolean;
  isActivity?: boolean;
  totalSleep?: string;
  timeInBed?: string;
  data:
    | {
        sleepData: { sleepStage: string; sleepLevel: string };
        timeDuration: number;
      }[]
    | { met: string; index: number }[];
  dataKey: string;
  XAxisDataKey: string;
  domain: number[];
  sleepStagesData?: SleepStagesDataProps[];
  activityStagesData?: ActivityStagesDataProps[];
}

export interface ChartProps {
  chartTitle?: string;
  data:
    | { heartRate: number; timeDuration: number }[]
    | {
        HRV: number;
        timeDuration: number;
      }[]
    | { humidity: string; temp: string; time: string }[];
  lineDataKey: string;
  xAxisDataKey: string;
  yAxisDomain: number[];
  lineColor?: string;
  legend?: boolean;
}

export interface ContainerProps {
  isFooter?: boolean;
}

export interface ContributorsProps {
  restingHR?: number;
  totalSleep?: string;
  readinessContributorData?: ReadinessContributorDataProps[];
  sleepContributorData?: SleepContributorDataProps[];
  activityContributorData?: ActivityContributorDataProps[];
}

export interface DailyScoreProps {
  isReadiness?: boolean;
  isSleep?: boolean;
  isActivity?: boolean;
  score: number;
}

export interface HamburgerIconProps {
  handleClickMobileDisplay: () => void;
  isMobileDisplay: boolean;
}

export interface HeartRateAndHRVChartsProps {
  avgHRData: number;
  minHeartRate: number;
  maxHeartRate: number;
  avgHRV: number;
  maxHRV: number;
  heartRateData: HeartDataProps[];
  hrvData: HrvDataProps[];
}

export interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LoadingProps {
  isBedroom?: boolean;
}

export interface MinMaxDataProps {
  temperature?: boolean;
  humidity?: boolean;
  minTemp?: number;
  maxTemp?: number;
  minHumidity?: number;
  maxHumidity?: number;
}

export interface PickDateRangeProps {
  weeklyAverages: WeekAveragesProps[];
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export interface QuadDataProps {
  isReadiness?: boolean;
  isSleep?: boolean;
  isActivity?: boolean;
  isBedroom?: boolean;
  quadOneText: string;
  quadOneData: string | number;
  quadTwoText: string;
  quadTwoData: string | number;
  quadThreeText: string;
  quadThreeData: string | number;
  quadFourText: string;
  quadFourData: string | number;
}

// All Render Props
export interface RenderActivityDataProps {
  score: number;
  todaysDate: string;
  calActive: string;
  calTotal: string;
  walkingEquivalency: string;
  steps: string;
  activityContributorData: ActivityContributorDataProps[];
  metFiveMinArray: MetFiveMinArrayProps[];
  activityStagesData?: ActivityStagesDataProps[];
}

export interface RenderBedroomDataProps {
  bedroomTempAvg: number;
  bedroomHumidityAvg: number;
  restingHR: number;
  avgHRV: number;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
  chartData: {
    humidity: string;
    temp: string;
    time: string;
  }[];
}

export interface RenderReadinessDataProps {
  todaysDate: string;
  score: number;
  restingHR: number;
  avgHRV: number;
  bodyTemp: number;
  respiratoryRate: number;
  avgHRData: number;
  minHeartRate: number;
  maxHeartRate: number;
  maxHRV: number;
  heartRateData: HeartDataProps[];
  hrvData: HrvDataProps[];
  readinessContributorData: ReadinessContributorDataProps[];
}

export interface RenderSleepDataProps {
  score: number;
  todaysDate: string;
  totalSleep: string;
  timeInBed: string;
  sleepEfficiency: number;
  avgHRData: number;
  minHeartRate: number;
  maxHeartRate: number;
  avgHRV: number;
  maxHRV: number;
  hypnogramData: HypnogramDataProps[];
  sleepStagesData: SleepStagesDataProps[];
  heartRateData: HeartDataProps[];
  hrvData: HrvDataProps[];
  sleepContributorData: SleepContributorDataProps[];
}

export interface RenderUserDataProps {
  isImperial: boolean;
  setUnits: (unit: string) => void;
  isMobileDisplay: boolean;
  handleClickMobileDisplay: () => void;
}

export interface RenderWeeklyAveragesProps {
  setStartDate: (startDate: string) => void;
  setEndDate: (emndDate: string) => void;
  showChartData: ShowChartDataProps;
  handleShowChartData: (chosenDate: string) => void;
  weeklyAverages: WeekAveragesProps[];
  chosenDateRange: chosenDateRangeProps[];
  isMobileDisplay: boolean;
  handleClickMobileDisplay: () => void;
}

// Rest of Components
export interface SideMenuProps {
  handleClickMobileDisplay: () => void;
  isMobileDisplay: boolean;
  logout?: () => void;
}

export interface StagesProps {
  stagesData?: {
    stage: string;
    seconds: number;
    percentage: number;
    showPercentage: boolean;
    color: string;
  }[];
}

export interface WeeklyAveragesChartProps {
  data: {
    restingHR: number;
    avgHRV: number;
    bodyTemp: number;
    avgBedroomTemp: number;
    avgHumidity: number;
    fullDate: string;
    date: string;
  }[];
  showChartData: ShowChartDataProps;
}
