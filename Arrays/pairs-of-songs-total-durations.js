// 1010. Pairs of Songs With Total Durations Divisible by 60

/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function (time) {
  let map = {};
  let count = 0;
  for (let i = 0; i < time.length; i++) {
    let songDuration = time[i];
    let songDurationMod60 = songDuration % 60;
    let complementDuration = (60 - songDurationMod60) % 60;

    if (complementDuration in map) {
      count += map[complementDuration];
    }

    if (songDurationMod60 in map) {
      map[songDurationMod60]++;
    } else {
      map[songDurationMod60] = 1;
    }
  }
  return count;
};
