const chai = require("chai");

function moveElementToEnd(array, toMove) {
  let start = 0;
  let end = array.length - 1;

  while (start < end) {
    if (array[start] === toMove) {
      let temp = array[start];
      array[start] = array[end];
      array[end] = temp;
      end--;
    } else {
      start++;
    }
  }
  return array;
}

// Time Complexity: O(N)
// Space Complexity: O(1)

// TEST
const array = [2, 1, 2, 2, 2, 3, 4, 2];
const toMove = 2;
const expectedStart = [1, 3, 4];
const expectedEnd = [2, 2, 2, 2, 2];
const output = moveElementToEnd(array, toMove);
const sorted = (array) => array.sort((a, b) => a - b);
const outputStart = sorted(output.slice(0, 3));
const outputEnd = output.slice(3);
chai.expect(outputStart).to.deep.equal(expectedStart);
chai.expect(outputEnd).to.deep.equal(expectedEnd);
