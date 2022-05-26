export const findDataByDate = (data: any, date: string) => {
  return data.find(({ day }: { day: string }) => day === date);
};
