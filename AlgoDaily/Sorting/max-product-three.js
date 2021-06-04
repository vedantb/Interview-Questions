function maxProductOfThree(arr) {
  let sortedArr = arr.sort((a, b) => a - b);
  let product1 = 1;
  let product2 = 1;
  let largestEl = sortedArr.length - 1;

  for (let x = largestEl; x > largestEl - 3; x--) {
    product1 = product1 * sortedArr[x];
  }

  product2 = sortedArr[0] * sortedArr[1] * sortedArr[largestEl];

  return Math.max(product1, product2);
}
