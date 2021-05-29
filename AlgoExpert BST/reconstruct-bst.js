// This is an input class. Do not edit.
class BST {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function reconstructBst(preOrderTraversalValues) {
  const treeInfo = { rootIdx: 0 };
  return reconstructBstHelper(-Infinity, Infinity, preOrderTraversalValues, treeInfo);
}

function reconstructBstHelper(lowerBound, upperBound, preOrderTraversalValues, currentTreeInfo) {
  if (currentTreeInfo.rootIdx === preOrderTraversalValues.length) return null;

  const rootValue = preOrderTraversalValues[currentTreeInfo.rootIdx];
  if (rootValue < lowerBound || rootValue >= upperBound) return null;
  currentTreeInfo.rootIdx++;
  const leftSubtree = reconstructBstHelper(lowerBound, rootValue, preOrderTraversalValues, currentTreeInfo);
  const rightSubtree = reconstructBstHelper(rootValue, upperBound, preOrderTraversalValues, currentTreeInfo);
  return new BST(rootValue, leftSubtree, rightSubtree);
}
