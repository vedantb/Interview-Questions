function findNodesDistanceK(tree, target, k) {
  const nodesDistanceK = [];
  findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
  return nodesDistanceK;
}

function findDistanceFromNodeToTarget(node, target, k, nodesDistanceK) {
  if (node === null) return -1;

  if (node.value === target) {
    addSubTreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
    return 1;
  }

  const leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK);
  const rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK);

  if (leftDistance !== -1) {
    addSubTreeNodeAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK);
    return leftDistance + 1;
  }

  if (rightDistance !== -1) {
    addSubTreeNodeAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK);
    return rightDistance + 1;
  }

  return -1;
}

function addSubTreeNodeAtDistanceK(node, distance, k, nodesDistanceK) {
  if (node === null) return;

  if (distance === k) nodesDistanceK.push(node.value);
  else {
    addSubTreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
    addSubTreeNodeAtDistanceK(node.right, distance + 1, k, nodesDistanceK);
  }
}
