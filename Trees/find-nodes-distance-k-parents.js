function findNodesDistanceK(tree, target, k) {
  const nodesToParents = {};
  populateNodesToParents(tree, nodesToParents);
  const targetNode = getNodeFromValue(target, tree, nodesToParents);

  return bfsForNodesAtDistanceK(targetNode, nodesToParents, k);
}

function populateNodesToParents(node, nodesToParents, parent = null) {
  if (node !== null) {
    nodesToParents[node.value] = parent;
    populateNodesToParents(node.left, nodesToParents, node);
    populateNodesToParents(node.right, nodesToParents, node);
  }
}

function getNodeFromValue(value, tree, nodesToParents) {
  if (tree.value === value) return tree;

  const nodeParent = nodesToParents[value];
  if (nodeParent.left !== null && nodeParent.left.value === value) return nodeParent.left;
  return nodeParent.right;
}

function bfsForNodesAtDistanceK(targetNode, nodesToParents, k) {
  const queue = [[targetNode, 0]];
  const seen = new Set([targetNode.value]);
  while (queue.length > 0) {
    const [currentNode, currentDistance] = queue.shift();

    if (currentDistance === k) {
      const nodesDistanceK = queue.map((pair) => pair[0].value);
      nodesDistanceK.push(currentNode.value);
      return nodesDistanceK;
    }

    const connectedNodes = [currentNode.left, currentNode.right, nodesToParents[currentNode.value]];
    for (const node of connectedNodes) {
      if (node === null) continue;
      if (seen.has(node.value)) continue;

      seen.add(node.value);
      queue.push([node, currentDistance + 1]);
    }
  }
  return [];
}
