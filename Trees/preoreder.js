function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

var preOrderTraversal = function (root) {
  if (!root) return [];
  let result = [];
  let stack = [root];

  while (stack.length > 0) {
    let node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
};

var preOrderTraversalRecursive = function (root, arr = []) {
  if (!root) return arr;

  arr.push(root.val);
  preOrderTraversalRecursive(root.left, arr);
  preOrderTraversalRecursive(root.right, arr);

  return arr;
};

let a = new TreeNode("a");
a.left = new TreeNode("b", new TreeNode("d"), new TreeNode("e"));
a.right = new TreeNode("c", new TreeNode("f"), new TreeNode("g"));

console.log(preOrderTraversal(a));
console.log(preOrderTraversalRecursive(a));
