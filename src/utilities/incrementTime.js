export const timeIncrement = (startTime, sleepDuration) => {
  console.log(`startTime`, startTime);
  let count = [startTime];
  let increment = 5; // increase 5min
  const endTime = Math.ceil(sleepDuration / 60 / 5); // seconds to minutes to five minute duration
  let times = startTime.split(":");
  let hour = parseInt(times[0]);
  let minute = parseInt(times[1]);

  for (let i = 0; i <= endTime + 30; i++) {
    minute = Math.floor(minute / 5) * 5;
    minute += increment;

    if (hour >= 24) {
      // Resets to military time to 0 after midnight
      hour = 0;
    }
    if (hour > 10 && minute < 10) {
      count.push(`${hour}:0${minute}`);
    }
    if (hour > 10 && minute >= 10 && minute < 60) {
      // Fixes issue with 22:60 and 22:65
      count.push(`${hour}:${minute}`);
    }
    // These work after midnight
    if (minute > 60) {
      count.push(`${++hour}:0${(minute = 0)}`);
    }
    if (hour > 10 && minute > 60) {
      count.push(`${++hour}:0${(minute = 0)}`);
    }
    if (hour < 10 && minute > 60) {
      count.push(`0${++hour}:0${(minute = 0)}`);
    }
    if (hour < 10 && minute < 10 && minute !== 0) {
      count.push(`0${hour}:0${minute}`);
    }
    if (hour < 10 && minute >= 10 && minute !== 60) {
      count.push(`0${hour}:${minute}`);
    }
  }
  return count;
};
