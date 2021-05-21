function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

let inorderMorrisTraversal = function (root) {
  let current = root;
  let result = [];
  while (current) {
    if (!current.left) {
      result.push(current.val);
      current = current.right;
    } else {
      let predecessor = getInorderPredecessor(current);
      if (!predecessor.right) {
        predecessor.right = current;
        current = current.left;
      } else {
        predecessor.right = null;
        result.push(current.val);
        current = current.right;
      }
    }
  }
  return result;
};

let getInorderPredecessor = function (node) {
  let predecessor = node.left;
  while (predecessor.right && predecessor.right !== node) {
    predecessor = predecessor.right;
  }
  return predecessor;
};

let a = new TreeNode("a");
a.left = new TreeNode("b", new TreeNode("d"), new TreeNode("e"));
a.right = new TreeNode("c", new TreeNode("f"), new TreeNode("g"));

console.log(inorderMorrisTraversal(a));
