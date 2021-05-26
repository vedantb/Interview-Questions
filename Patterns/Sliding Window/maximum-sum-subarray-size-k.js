// Given an array of positive numbers and a positive number 'k',
// find the "maximum sum of any continguous subarray of size 'k'"

const maxSumSubArraySizeK = function (k, arr) {
  let result = 0;
  let windowStart = 0;
  let windowSum = 0;
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];
    if (windowEnd >= k - 1) {
      result = Math.max(result, windowSum);
      windowSum -= arr[windowStart];
      windowStart += 1;
    }
  }
  return result;
};

console.log(maxSumSubArraySizeK(3, [2, 1, 5, 1, 3, 2]));
console.log(maxSumSubArraySizeK(2, [2, 3, 4, 1, 5]));
