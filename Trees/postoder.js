function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function postorderTraversalIterative(root) {
  const output = [];
  const stack = [root];
  let result = [];

  while (stack.length) {
    let node = stack.pop();
    output.push(node);

    if (node.left) {
      stack.push(node.left);
    }

    if (node.right) {
      stack.push(node.right);
    }
  }

  while (output.length) {
    let node = output.pop();
    result.push(node.val);
  }

  return result;
}

function postorderTraversalRecursive(root, arr = []) {
  if (!root) return arr;

  postorderTraversalRecursive(root.left, arr);
  postorderTraversalRecursive(root.right, arr);
  arr.push(root.val);

  return arr;
}

let a = new TreeNode("a");
a.left = new TreeNode("b", new TreeNode("d"), new TreeNode("e"));
a.right = new TreeNode("c", new TreeNode("f"), new TreeNode("g"));

console.log(postorderTraversalRecursive(a));
console.log(postorderTraversalIterative(a));
