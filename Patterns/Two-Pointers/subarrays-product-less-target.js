/**
 * Given an array with positive numbers and a target number, find all of its contiguous subarrays whose product is less than the target number.
 */

const find_subarrays = function (arr, target) {
  if (target <= 1) return 0;
  if (!arr || arr.length === 0) return 0;

  let result = [],
    product = 1,
    left = 0;
  for (right = 0; right < arr.length; right++) {
    product *= arr[right];
    while (product >= target && left < arr.length) {
      product /= arr[left];
      left += 1;
    }
    const tempList = [];
    for (let i = right; i > left - 1; i--) {
      tempList.unshift(arr[i]);
      result.push([...tempList]);
    }
  }
  return result;
};

console.log(find_subarrays([10, 5, 2, 6], 100));
console.log(find_subarrays([8, 2, 6, 5], 50));
