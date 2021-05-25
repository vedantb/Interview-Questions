// This is an input class. Do not edit.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function compareLeafTraversal(tree1, tree2) {
  const tree1TraversalStack = [tree1];
  const tree2TraversalStack = [tree2];

  while (tree1TraversalStack.length > 0 && tree2TraversalStack.length > 0) {
    const tree1Leaf = getNextleafNode(tree1TraversalStack);
    const tree2Leaf = getNextleafNode(tree2TraversalStack);

    if (tree1Leaf.value !== tree2Leaf.value) return false;
  }
  return tree1TraversalStack.length === 0 && tree2TraversalStack.length === 0;
}

function getNextleafNode(traversalStack) {
  let currentNode = traversalStack.pop();

  while (!isLeafNode(currentNode)) {
    if (currentNode.right !== null) traversalStack.push(currentNode.right);
    // left node is added after the right so it's popped off first
    if (currentNode.left !== null) traversalStack.push(currentNode.left);
    currentNode = traversalStack.pop();
  }
  return currentNode;
}

function isLeafNode(node) {
  return node.left === null && node.right === null;
}
