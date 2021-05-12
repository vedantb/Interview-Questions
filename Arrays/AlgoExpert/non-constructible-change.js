const chai = require("chai");

function nonConstructibleChange(coins) {
  let currentChangeCreated = 0;
  coins.sort((a, b) => a - b);
  for (const coin of coins) {
    if (coin > currentChangeCreated + 1) {
      return currentChangeCreated + 1;
    }
    currentChangeCreated += coin;
  }
  return currentChangeCreated + 1;
}

const input = [5, 7, 1, 1, 2, 3, 22];
const expected = 20;
const actual = nonConstructibleChange(input);
chai.expect(actual).to.deep.equal(expected);
