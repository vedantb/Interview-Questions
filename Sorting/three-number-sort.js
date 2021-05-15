const chai = require("chai");

function threeNumberSort(array, order) {
  const firstValue = order[0];
  const secondValue = order[1];

  let firstIdx = 0;
  let secondIdx = 0;
  let thirdIdx = array.length - 1;
  while (secondIdx <= thirdIdx) {
    let value = array[secondIdx];
    if (value === firstValue) {
      let temp = array[firstIdx];
      array[firstIdx] = array[secondIdx];
      array[secondIdx] = temp;
      firstIdx++;
      secondIdx++;
    } else if (value === secondValue) {
      secondIdx++;
    } else {
      let temp = array[secondIdx];
      array[secondIdx] = array[thirdIdx];
      array[thirdIdx] = temp;
      thirdIdx--;
    }
  }
  return array;
}

const array = [1, 0, 0, -1, -1, 0, 1, 1];
const order = [0, 1, -1];
const expected = [0, 0, 0, 1, 1, 1, -1, -1];
const actual = threeNumberSort(array, order);
chai.expect(actual).to.deep.equal(expected);
