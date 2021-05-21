const BinaryTree = require("./binaryTree");

var hasPathSum = function (root, targetSum) {
  return hasPathSumHelper(root, 0, targetSum);
};

var hasPathSumHelper = function (node, runningSum, targetSum) {
  if (!node) return false;

  const newRunningSum = runningSum + node.value;
  if (!node.left && !node.right) {
    return newRunningSum === targetSum;
  }

  return (
    hasPathSumHelper(node.left, newRunningSum, targetSum) || hasPathSumHelper(node.right, newRunningSum, targetSum)
  );
};

const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(hasPathSum(tree, 15));
