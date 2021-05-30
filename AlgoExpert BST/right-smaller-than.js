function rightSmallerThan(array) {
  if (array.length === 0) return [];

  const rightSmallerCounts = array.slice();
  const lastIdx = array.length - 1;
  const bst = new SpecialBST(array[lastIdx]);
  rightSmallerCounts[lastIdx] = 0;
  for (let i = array.length - 2; i >= 0; i--) {
    bst.insert(array[i], i, rightSmallerCounts);
  }
  return rightSmallerCounts;
}

class SpecialBST {
  constructor(value) {
    this.value = value;
    this.leftSubTreeSize = 0;
    this.left = null;
    this.right = null;
  }

  insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime = 0) {
    if (value < this.value) {
      this.leftSubTreeSize++;
      if (this.left === null) {
        this.left = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        this.left.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
      }
    } else {
      numSmallerAtInsertTime += this.leftSubTreeSize;
      if (value > this.value) numSmallerAtInsertTime++;
      if (this.right === null) {
        this.right = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        this.right.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
      }
    }
  }
}

// Do not edit the line below.
exports.rightSmallerThan = rightSmallerThan;
