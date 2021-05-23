function iterativeInorderTraversalWithParent(tree, callback) {
  let previousNode = null;
  let currentNode = tree;
  while (currentNode) {
    let nextNode;
    if (previousNode === null || previousNode === currentNode.parent) {
      if (currentNode.left) {
        nextNode = currentNode.left;
      } else {
        callback(currentNode);
        nextNode = currentNode.right ? currentNode.right : currentNode.parent;
      }
    } else if (previousNode === currentNode.left) {
      callback(currentNode);
      nextNode = currentNode.right ? currentNode.right : currentNode.parent;
    } else {
      nextNode = currentNode.parent;
    }
    previousNode = currentNode;
    currentNode = nextNode;
  }
}

class BinaryTree {
  constructor(value, parent = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

const root = new BinaryTree(1);
root.left = new BinaryTree(2, root);
root.left.left = new BinaryTree(4, root.left);
root.left.left.right = new BinaryTree(9, root.left.left);
root.right = new BinaryTree(3, root);
root.right.left = new BinaryTree(6, root.right);
root.right.right = new BinaryTree(7, root.right);

function testCallback(tree) {
  if (tree === null) return;
  console.log(tree.value);
}

iterativeInorderTraversalWithParent(root, testCallback);
