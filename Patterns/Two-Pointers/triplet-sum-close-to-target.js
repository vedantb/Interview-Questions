function searchTripletSum(arr, targetSum) {
  arr.sort((a, b) => a - b);
  let smallestDifference = Infinity;
  let resultTriplet = [];
  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    let right = arr.length - 1;
    let left = i + 1;
    while (left < right) {
      const targetDiff = targetSum - arr[i] - arr[left] - arr[right];
      if (targetDiff === 0) {
        return [arr[i], arr[left], arr[right]];
      }
      if (Math.abs(targetDiff) < Math.abs(smallestDifference)) {
        smallestDifference = targetDiff;
        resultTriplet = [arr[i], arr[left], arr[right]];
      }
      if (
        Math.abs(targetDiff) < Math.abs(smallestDifference) ||
        (Math.abs(targetDiff) === Math.abs(smallestDifference) && targetDiff > smallestDifference)
      ) {
        smallestDifference = targetDiff; // save the closest and the biggest difference
        resultTriplet = [arr[i], arr[left], arr[right]];
      }

      if (targetDiff > 0) {
        left += 1;
      } else {
        right -= 1;
      }
    }
  }
  return resultTriplet;
}

console.log(searchTripletSum([-2, 0, 1, 2, 0], 2));
console.log(searchTripletSum([-3, -1, 1, 2], 1));
console.log(searchTripletSum([1, 0, 1, 1], 100));
