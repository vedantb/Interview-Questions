// array of integers between 1 and n, where n is length of array. return the first integer that appears more than once.
function firstDuplicateValue(array) {
  for (const value of array) {
    const absValue = Math.abs(value);
    if (array[absValue - 1] < 0) return absValue;
    array[absValue - 1] *= -1;
  }
  return -1;
}
