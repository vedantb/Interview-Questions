const find_missing_number = function (nums) {
  let i = 0;
  while (i < nums.length) {
    const j = nums[i];
    if (nums[i] < nums.length && nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
    } else {
      i += 1;
    }
  }

  for (let count = 0; count < nums.length; count++) {
    if (count !== nums[count]) return count;
  }
  return nums.length;
};

console.log(find_missing_number([4, 0, 3, 1]));
console.log(find_missing_number([8, 3, 5, 2, 4, 6, 0, 1]));
