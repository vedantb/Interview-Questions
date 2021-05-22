function binaryTreeDiameter(tree) {
  if (!tree) return 0;

  return binaryTreeDiameterHelper(tree).diameter;
}

function binaryTreeDiameterHelper(tree) {
  if (!tree) return { diameter: 0, height: 0 };

  const { diameter: leftDiameter, height: leftHeight } = binaryTreeDiameterHelper(tree.left);
  const { diameter: rightDiameter, height: rightHeight } = binaryTreeDiameterHelper(tree.right);

  const longestPathThroughRoot = leftHeight + rightHeight;
  const maxDiameterSoFar = Math.max(leftDiameter, rightDiameter);
  const currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);
  const currentHeight = 1 + Math.max(leftHeight, rightHeight);

  return { diameter: currentDiameter, height: currentHeight };
}
