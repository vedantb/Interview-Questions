const smallestSubarrayWithSum = function (s, arr) {
  let windowSum = 0;
  let minLength = Infinity;
  let windowStart = 0;
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];
    while (windowSum >= s) {
      minLength = Math.min(minLength, windowEnd - windowStart + 1);
      windowSum -= arr[windowStart];
      windowStart++;
    }
  }
  return minLength === Infinity ? 0 : minLength;
};

console.log(smallestSubarrayWithSum(7, [2, 1, 5, 2, 3, 2]));
