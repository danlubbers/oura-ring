export const getAverages = (averagesArray: number[]): number => {
  return averagesArray.reduce((avg, value, _, { length }) => {
    return avg + value / length;
  }, 0);
};
