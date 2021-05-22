function maxPathSum(tree) {
  const [_, maxSum] = maxPathSumHelper(tree);

  return maxSum;
}

function maxPathSumHelper(tree) {
  if (tree === null) return [0, -Infinity];

  const [maxSumFromLeftBranch, leftBestMaxSum] = maxPathSumHelper(tree.left);
  const [maxSumFromRightBranch, rightBestMaxSum] = maxPathSumHelper(tree.right);

  const maxChildSumAsBranch = Math.max(maxSumFromLeftBranch, maxSumFromRightBranch);
  const maxSumAsBranch = Math.max(maxChildSumAsBranch + tree.value, tree.value);

  const maxSumAsRootNode = Math.max(maxSumFromLeftBranch + maxSumFromRightBranch + tree.value, maxSumAsBranch);
  const maxPathSum = Math.max(leftBestMaxSum, rightBestMaxSum, maxSumAsRootNode);

  return [maxSumAsBranch, maxPathSum];
}
