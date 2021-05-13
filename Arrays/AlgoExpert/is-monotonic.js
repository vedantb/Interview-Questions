const chai = require("chai");

function isMonotonic(array) {
  if (array.length <= 2) return true;

  let direction = array[1] - array[0];
  for (let i = 2; i < array.length; i++) {
    if (direction === 0) {
      direction = array[i] - array[i - 1];
      continue;
    }
    if (breaksDirection(direction, array[i - 1], array[i])) {
      return false;
    }
  }

  return true;
}

function breaksDirection(direction, previousInt, currentInt) {
  const difference = currentInt - previousInt;
  if (direction > 0) return difference < 0;
  return difference > 0;
}

function isMonotonic2(array) {
  let isNonDecreasing = true;
  let isNonIncreasing = true;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) isNonDecreasing = false;
    if (array[i] > array[i - 1]) isNonIncreasing = false;
  }

  return isNonDecreasing || isNonIncreasing;
}

const array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001];
const expected = true;
const actual = isMonotonic(array);
chai.expect(actual).to.deep.equal(expected);

const array2 = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001];
const expected2 = true;
const actual2 = isMonotonic2(array2);
chai.expect(actual2).to.deep.equal(expected2);
