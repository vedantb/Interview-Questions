/**
 * Given an array with positive numbers and a target number, find all of its contiguous subarrays whose product is less than the target number.
 */

const find_subarrays = function (arr, target) {
  if (target <= 1) return 0;
  if (!arr || arr.length === 0) return 0;

  let product = 1;
  let result = 0;

  let left = 0;
  let right = 0;

  while (right < arr.length) {
    product *= arr[right];

    while (product >= target) {
      product /= arr[left];
      left++;
    }

    result += right - left + 1;
    right++;
  }

  return result;
};

console.log(find_subarrays([10, 5, 2, 6], 100));
console.log(find_subarrays([8, 2, 6, 5], 50));
