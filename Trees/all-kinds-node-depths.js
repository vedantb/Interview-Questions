function allKindsOfNodeDepts(root) {
  let sumofAllDepths = 0;
  let stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node === null) continue;
    sumofAllDepths += nodeDepths(node);
    stack.push(node.left);
    stack.push(node.right);
  }
  return sumofAllDepths;
}

function nodeDepths(node, depth = 0) {
  if (node === null) return 0;
  return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
}

// --- SOLUTION 2 ---

function allKindsOfNodeDepths2(root, depth = 0) {
  if (!root) return 0;

  const depthSum = (depth * (depth + 1)) / 2;
  return depthSum + allKindsOfNodeDepths(root.left, depth + 1) + allKindsOfNodeDepths(root.right, depth + 1);
}
