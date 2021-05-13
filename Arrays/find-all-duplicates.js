var findDuplicates = function (array) {
  let result = [];
  for (const value of array) {
    const absValue = Math.abs(value);
    if (array[absValue - 1] < 0) result.push(absValue);
    array[absValue - 1] *= -1;
  }
  return result;
};
