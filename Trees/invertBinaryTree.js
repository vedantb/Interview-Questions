function invertBinaryTreeIterative(root) {
  const queue = [root];
  while (queue.length) {
    const current = queue.shift();
    if (current === null) continue;
    const left = current.left;
    current.left = current.right;
    current.right = left;
    queue.push(current.left);
    queue.push(current.right);
  }
}

function invertBinaryTreeRecursive(root) {
  if (!root) return;
  const left = root.left;
  root.left = root.right;
  root.right = left;
  invertBinaryTreeRecursive(root.left);
  invertBinaryTreeRecursive(root.right);
}
