// This is an input class. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function validateBst(tree, minValue = -Infinity, maxValue = Infinity) {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const isLeftValid = validateBst(tree.left, minValue, tree.value);
  const isRightValid = validateBst(tree.right, tree.value, maxValue);
  return isLeftValid && isRightValid;
}
