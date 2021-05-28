let twoSum = function (arr, targetSum) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];

    if (sum === targetSum) {
      return [left, right];
    }

    if (sum > targetSum) {
      right -= 1;
    } else {
      left += 1;
    }
  }
  return [-1, -1];
};

console.log(twoSum([1, 2, 3, 4, 6], 6));
console.log(twoSum([2, 5, 9, 11], 11));
