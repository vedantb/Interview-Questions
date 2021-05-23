// This is the class of the input root. Do not edit it.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function flattenBinaryTree(root) {
  const inorderNodes = getNodesInOrder(root, []);
  for (let i = 0; i < inorderNodes.length - 1; i++) {
    const leftNode = inorderNodes[i];
    const rightNode = inorderNodes[i + 1];
    leftNode.right = rightNode;
    rightNode.left = leftNode;
  }
  return inorderNodes[0];
}

function getNodesInOrder(tree, array) {
  if (tree !== null) {
    getNodesInOrder(tree.left, array);
    array.push(tree);
    getNodesInOrder(tree.right, array);
  }
  return array;
}
