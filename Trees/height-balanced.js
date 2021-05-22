function isBalanced(root) {
  return isBalancedHelper(root).isBalanced;
}

function isBalancedHelper(node) {
  if (!node) return { isBalanced: true, height: -1 };
  const { isBalanced: isLeftBalanced, height: leftHeight } = isBalancedHelper(node.left);
  const { isBalanced: isRightBalanced, height: rightHeight } = isBalancedHelper(node.right);

  const isBalanced = isLeftBalanced && isRightBalanced && Math.abs(leftHeight - rightHeight) <= 1;
  const height = Math.max(leftHeight, rightHeight) + 1;
  return { isBalanced, height };
}
