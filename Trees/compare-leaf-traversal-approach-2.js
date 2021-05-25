// This is an input class. Do not edit.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function compareLeafTraversal(tree1, tree2) {
  const [tree1LeafNodesLinkedList, _1] = connectLeafNodes(tree1);
  const [tree2LeafNodesLinkedList, _2] = connectLeafNodes(tree2);

  let list1CurrentNode = tree1LeafNodesLinkedList;
  let list2CurrentNode = tree2LeafNodesLinkedList;
  while (list1CurrentNode !== null && list2CurrentNode !== null) {
    if (list1CurrentNode.value !== list2CurrentNode.value) return false;

    list1CurrentNode = list1CurrentNode.right;
    list2CurrentNode = list2CurrentNode.right;
  }

  return list1CurrentNode === null && list2CurrentNode === null;
}

function connectLeafNodes(currentNode, head = null, previous = null) {
  if (currentNode === null) return [head, previous];

  if (isLeafNode(currentNode)) {
    if (previous === null) {
      head = currentNode;
    } else {
      previous.right = currentNode;
    }
    previous = currentNode;
  }

  const [leftHead, leftPreviousNode] = connectLeafNodes(currentNode.left, head, previous);
  return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode);
}

function isLeafNode(node) {
  return node.left === null && node.right === null;
}
