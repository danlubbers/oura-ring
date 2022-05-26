import {
  HeartRateProps,
  MergedHeartRateProps,
  TagProps,
  MergedTagProps,
  SessionProps,
  MergedSessionProps,
  WorkoutProps,
  MergedWorkoutProps,
} from "../types/dataTypes";

// https://stackoverflow.com/questions/49414589/loop-over-array-of-objects-and-combine-them-if-they-have-similar-keys/49414652#49414652
export const mergedHeartRateDataByDate = (
  heartRateData: HeartRateProps[]
): MergedHeartRateProps[] => {
  return Object.values(
    heartRateData.reduce((acc: { [key: string]: any }, curVal) => {
      const day = curVal.timestamp.slice(0, 10);
      (
        acc[day] ||
        (acc[day] = {
          day,
          heartRateData: [],
        })
      ).heartRateData.push({
        bpm: curVal.bpm,
        source: curVal.source,
        timestamp: curVal.timestamp,
      });

      return acc;
    }, [] as MergedHeartRateProps[])
  );
};

export const mergedTagDataByDate = (tagData: TagProps[]): MergedTagProps[] => {
  return Object.values(
    tagData.reduce((acc: { [key: string]: any }, curVal) => {
      (
        acc[curVal.day] ||
        (acc[curVal.day] = {
          day: curVal.day,
          tagData: [],
        })
      ).tagData.push({
        text: curVal.text,
        tags: curVal.tags,
        timestamp: curVal.timestamp,
      });

      return acc;
    }, [] as MergedTagProps[])
  );
};

export const mergedSessionDataByDate = (
  sessionData: SessionProps[]
): MergedSessionProps[] => {
  return Object.values(
    sessionData.reduce((acc: any, curVal) => {
      (
        acc[curVal.day] ||
        (acc[curVal.day] = {
          day: curVal.day,
          sessionData: [],
        })
      ).sessionData.push({
        start_datetime: curVal.start_datetime,
        end_datetime: curVal.end_datetime,
        type: curVal.type,
        mood: curVal.mood,
        motion_count: curVal.motion_count,
        heart_rate: curVal.heart_rate,
        heart_rate_variability: curVal.heart_rate_variability,
      });
      return acc;
    }, [] as MergedSessionProps[])
  );
};

export const mergedWorkoutDataByDate = (
  sessionData: WorkoutProps[]
): MergedWorkoutProps[] => {
  return Object.values(
    sessionData.reduce((acc: any, curVal) => {
      (
        acc[curVal.day] ||
        (acc[curVal.day] = {
          day: curVal.day,
          workoutData: [],
        })
      ).workoutData.push({
        activity: curVal.activity,
        calories: curVal.calories,
        day: curVal.day,
        distance: curVal.distance,
        end_datetime: curVal.end_datetime,
        intensity: curVal.intensity,
        label: curVal.label,
        source: curVal.source,
        start_datetime: curVal.start_datetime,
      });
      return acc;
    }, [] as MergedWorkoutProps[])
  );
};
