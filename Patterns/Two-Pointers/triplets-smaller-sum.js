const tripletWithSmallerSum = (arr, target) => {
  arr.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < arr.length - 2; i++) {
    searchPair(arr, target - arr[i], i, triplets);
  }
  return triplets;
};

const searchPair = (arr, targetSum, first, triplets) => {
  let left = first + 1;
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] + arr[right] < targetSum) {
      for (let i = right; i > left; i--) {
        triplets.push([arr[first], arr[left], arr[i]]);
      }
      left += 1;
    } else {
      right -= 1;
    }
  }
};

console.log(tripletWithSmallerSum([-1, 0, 2, 3], 3));
console.log(tripletWithSmallerSum([-1, 4, 2, 1, 3], 5));
