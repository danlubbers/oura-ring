export const secondsToHm = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);

  const hourDisplay = hour > 0 ? hour + "h " : "";
  const minuteDisplay = minute > 0 ? minute + "m" : "";

  return hourDisplay + minuteDisplay;
};
