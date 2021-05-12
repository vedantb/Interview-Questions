const chai = require("chai");

function isValidSubsequence(array, sequence) {
  if (!sequence || sequence.length === 0) return true;
  let sequencePtr = 0;

  for (let i = 0; i < array.length; i++) {
    if (sequence[sequencePtr] === array[i]) {
      sequencePtr++;
      if (sequencePtr >= sequence.length) return true;
    }
  }
  return false;
}

let array = [5, 1, 22, 25, 6, -1, 8, 10];
let sequence = [1, 6, -1, 10];
chai.expect(isValidSubsequence(array, sequence)).to.deep.equal(true);

array = [5, 1, 22, 25, 6, -1, 8, 10];
sequence = [5, 1, 22, 6, -1, 8, 10];
chai.expect(isValidSubsequence(array, sequence)).to.deep.equal(true);

sequence = [5, 1, 22, 25, 6, -1, 8, 10, 12];
chai.expect(isValidSubsequence(array, sequence)).to.deep.equal(false);
