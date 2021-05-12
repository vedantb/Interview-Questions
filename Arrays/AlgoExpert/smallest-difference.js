const chai = require("chai");

function smallestDifference(arrayOne, arrayTwo) {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);
  let idx1 = 0;
  let idx2 = 0;
  let minDifference = Infinity;
  let smallestPair = [];
  while (idx1 < arrayOne.length && idx2 < arrayTwo.length) {
    let arrayOneElem = arrayOne[idx1];
    let arrayTwoElem = arrayTwo[idx2];
    const difference = Math.abs(arrayOneElem - arrayTwoElem);

    if (difference === 0) return [arrayOneElem, arrayTwoElem];

    if (difference < minDifference) {
      minDifference = difference;
      smallestPair = [arrayOneElem, arrayTwoElem];
    }

    arrayOneElem > arrayTwoElem ? idx2++ : idx1++;
  }
  return smallestPair;
}

chai.expect(smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17])).to.deep.equal([28, 26]);
