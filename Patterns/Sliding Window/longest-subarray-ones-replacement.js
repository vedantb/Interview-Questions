// Given an array containing 0s and 1s, if you are allowed to replace no more than ‘k’ 0s with 1s,
// find the length of the longest contiguous subarray having all 1s.

// Example 1: Array=[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2
// Output: 6
// Replace the '0' at index 5 and 8 to have the longest contiguous subarray of 1s having length 6.

let longestSubarrayOnes = function (arr, k) {
  let windowStart = 0;
  let maxLen = 0;
  let maxOnesCount = 0;
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    let currentNum = arr[windowEnd];
    if (currentNum === 1) {
      maxOnesCount += 1;
    }

    if (windowEnd - windowStart + 1 - maxOnesCount > k) {
      if (arr[windowStart] === 1) {
        maxOnesCount -= 1;
      }
      windowStart += 1;
    }

    maxLen = Math.max(maxLen, windowEnd - windowStart + 1);
  }
  return maxLen;
};

console.log(longestSubarrayOnes([0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], 2));
console.log(longestSubarrayOnes([0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], 3));
