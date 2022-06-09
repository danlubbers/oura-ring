export const filterAverages = (
  CvsData: {
    Timestamp: string;
    Temperature_Fahrenheit: string;
    Relative_Humidity: string;
  }[],
  date: string,
  category: string
) => {
  return CvsData.filter((csvObj) => {
    const hour = Number(csvObj.Timestamp.slice(11, 13));
    return (
      date === String(new Date(csvObj.Timestamp)).slice(0, 15) && hour <= 10
    );
  }).map((csvObj) =>
    parseInt(
      category === "temperature"
        ? csvObj.Temperature_Fahrenheit
        : csvObj.Relative_Humidity
    )
  );
};
