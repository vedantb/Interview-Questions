const chai = require("chai");

function arrayOfProducts(array) {
  let result = Array(array.length).fill(1);

  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    result[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  let rightRunningProduct = 1;
  for (let j = array.length - 1; j >= 0; j--) {
    result[j] *= rightRunningProduct;
    rightRunningProduct *= array[j];
  }

  return result;
}

const array = [5, 1, 4, 2];
const expected = [8, 40, 10, 20];
const actual = arrayOfProducts(array);
chai.expect(actual).to.deep.equal(expected);
