let minSubarraySizeLen = function (target, nums) {
  let left = 0;
  let sum = 0;
  let ans = Infinity;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    while (sum >= target) {
      ans = Math.min(ans, i - left + 1);
      sum = sum - nums[left];
      left++;
    }
  }
  return ans === Infinity ? 0 : ans;
};

console.log(minSubarraySizeLen(7, [2, 3, 1, 2, 4, 3]));
