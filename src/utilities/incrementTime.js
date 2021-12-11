export const timeIncrement = (startTime, sleepDuration) => {
  let count = [startTime];
  let increment = 5; // increase 5min
  const endTime = Math.ceil(sleepDuration / 60 / 5); // seconds to minutes to five minute duration
  // console.log(`endTime`, Math.ceil(endTime / 5) * 5);

  const endTimeRoundedByFive = Math.ceil(endTime / 5) * 5 + 20; // Round up by 5min increments and add 20min as for loop is getting cut off. Check back and find bug as to why this is...

  let times = startTime.split(":");
  let hour = parseInt(times[0]);
  let minute = parseInt(times[1]);

  for (let i = 0; i <= endTimeRoundedByFive; i++) {
    minute = Math.floor(minute / 5) * 5;
    minute += increment;

    if (hour >= 24) {
      // Resets to military time to 0 after midnight
      hour = 0;
    }
    if (minute > 60) {
      ++hour;
      minute = 0;
    }
    if (hour > 10 && minute < 10) {
      // This accounts for top of the hour and 5min before midnight
      count.push(`${hour}:0${minute}`);
    }
    if (hour > 10 && minute >= 10 && minute < 60) {
      // This accounts for all time between 10min - 55min before midnight
      // Fixes issue with 22:60 and 22:65
      count.push(`${hour}:${minute}`);
    }

    /* These work after midnight */
    if (hour < 10 && minute < 10 && minute !== 0) {
      // This accounts for five after each hour Ex. 1:05am
      count.push(`0${hour}:0${minute}`);
    }
    if (hour < 10 && minute === 0) {
      // This accounts for top of the hour after midnight: Ex. 1:00am
      count.push(`0${hour}:0${minute}`);
    }
    if (hour < 10 && minute >= 10 && minute !== 60) {
      // This accounts for all time between 10min - 55min after midnight
      count.push(`0${hour}:${minute}`);
    }
  }
  return count;
};
