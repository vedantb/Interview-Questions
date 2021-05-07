const smallest_subarray_with_given_sum = function (s, arr) {
  let windowStart = 0;
  let windowSum = 0;
  let minLength = Infinity;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];
    while (windowSum >= s) {
      minLength = windowSum === s ? Math.min(minLength, windowEnd - windowStart + 1) : minLength;
      windowSum -= arr[windowStart];
      windowStart++;
    }
  }
  if (minLength === Infinity) return 0;
  return minLength;
};

console.log(`Smallest subarray length: ${smallest_subarray_with_given_sum(7, [2, 2, 2, 2])}`);
console.log(`Smallest subarray length: ${smallest_subarray_with_given_sum(7, [2, 1, 5, 2, 8])}`);
console.log(`Smallest subarray length: ${smallest_subarray_with_given_sum(8, [3, 4, 1, 1, 6])}`);
