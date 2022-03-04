export type UserProps = {
  age: number;
  email: string;
  gender: string;
  height: number;
  weight: number;
};

export type TodaysProps = {
  date: string;
  bedtimeStart: string;
  bedtimeEnd: string;

  data: {
    readiness: ReadinessProps;
    sleep: SleepProps;
    activity: ActivityProps;
  };
};

export type ReadinessProps = {
  period_id: number;
  rest_mode_state: number;
  score: number;
  score_activity_balance: number;
  score_hrv_balance: number;
  score_previous_day: number;
  score_previous_night: number;
  score_recovery_index: number;
  score_resting_hr: number;
  score_sleep_balance: number;
  score_temperature: number;
  summary_date: string;
};

export type SleepProps = {
  awake: number;
  bedtime_end: string;
  bedtime_end_delta: number;
  bedtime_start: string;
  bedtime_start_delta: number;
  breath_average: number;
  deep: number;
  duration: number;
  efficiency: number;
  hr_5min: number[];
  hr_average: number;
  hr_lowest: number;
  hypnogram_5min: string;
  is_longest: number;
  light: number;
  midpoint_at_delta: number;
  midpoint_time: number;
  onset_latency: number;
  period_id: number;
  rem: number;
  restless: number;
  rmssd: number;
  rmssd_5min: number[];
  score: number;
  score_alignment: number;
  score_deep: number;
  score_disturbances: number;
  score_efficiency: number;
  score_latency: number;
  score_rem: number;
  score_total: number;
  summary_date: string;
  temperature_delta: number;
  temperature_deviation: number;
  temperature_trend_deviation: number;
  timezone: number;
  total: number;
};

export type ActivityProps = {
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

export interface BedroomDataProps {
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

export interface SetTokenProps {
  setToken?: (userToken: { token: string }) => void;
}

export interface LoginProps {
  handleUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  error: { usernameError: string | null; passwordError: string | null };
}

export interface InputProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type HeartDataProps = {
  heartRate: number;
  timeDuration: number;
};

export type HrvDataProps = { HRV: number; timeDuration: number };

export type readinessContributorDataProps = {
  name: string;
  score: number;
};

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
  readinessContributorData: readinessContributorDataProps[];
}

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
