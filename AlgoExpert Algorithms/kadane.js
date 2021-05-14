// maximum subarray
function kadanesAlgorithm(array) {
  let maxCurrent = array[0];
  let maxGlobal = array[0];
  for (let i = 1; i < array.length; i++) {
    maxCurrent = Math.max(array[i], array[i] + maxCurrent);
    maxGlobal = Math.max(maxCurrent, maxGlobal);
  }
  return maxGlobal;
}
