function mergeOverlappingIntervals(array) {
  array.sort((a, b) => a[0] - b[0]);
  let resultIntervals = [];
  let currentInterval = array[0];
  resultIntervals.push(currentInterval);
  for (const nextInterval of array) {
    const [_, currentIntervalEnd] = currentInterval;
    const [nextIntervalStart, nextIntervalEnd] = nextInterval;
    if (currentIntervalEnd >= nextIntervalStart) {
      currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
    } else {
      currentInterval = nextInterval;
      resultIntervals.push(currentInterval);
    }
  }
  return resultIntervals;
}
