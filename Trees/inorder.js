function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

let inorderTraversalRecursive = function (root, arr = []) {
  if (!root) return arr;

  inorderTraversalRecursive(root.left, arr);
  arr.push(root.val);
  inorderTraversalRecursive(root.right, arr);

  return arr;
};

let inorderTraversalIterative = function (root) {
  if (!root) return [];

  let result = [];
  let stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
};

let a = new TreeNode("a");
a.left = new TreeNode("b", new TreeNode("d"), new TreeNode("e"));
a.right = new TreeNode("c", new TreeNode("f"), new TreeNode("g"));

console.log(inorderTraversalRecursive(a));
console.log(inorderTraversalIterative(a));
