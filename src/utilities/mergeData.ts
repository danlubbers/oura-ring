import { TagProps, MergedTagProps } from "../types/dataTypes";

// https://stackoverflow.com/questions/49414589/loop-over-array-of-objects-and-combine-them-if-they-have-similar-keys/49414652#49414652
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
