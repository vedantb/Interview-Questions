const chai = require("chai");

function largestRange(array) {
  let visitedNumbersMap = {};
  let bestRange = [];
  let longestLength = 0;

  for (const num of array) {
    visitedNumbersMap[num] = false;
  }

  for (const num of array) {
    if (visitedNumbersMap[num] === true) continue;
    visitedNumbersMap[num] = true;
    let currentLength = 1;
    let left = num - 1;
    let right = num + 1;
    while (left in visitedNumbersMap) {
      visitedNumbersMap[left] = true;
      currentLength++;
      left--;
    }
    while (right in visitedNumbersMap) {
      visitedNumbersMap[right] = true;
      currentLength++;
      right++;
    }
    if (currentLength > longestLength) {
      longestLength = currentLength;
      bestRange = [left + 1, right - 1];
    }
  }
  return bestRange;
}

// Time Complexity: O(N)
// Space Complexity: O(N)

chai
  .expect(largestRange([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]))
  .to.deep.equal([0, 7]);
