// This is an input class. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  let searchOne = nodeOne;
  let searchTwo = nodeThree;
  while (true) {
    const foundThreeFromOne = searchOne === nodeThree;
    const foundOneFromThree = searchTwo === nodeOne;
    const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
    const finishedSearching = searchOne === null && searchTwo === null;
    if (foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching) {
      break;
    }

    if (searchOne !== null) {
      searchOne = searchOne.value > nodeTwo.value ? searchOne.left : searchOne.right;
    }

    if (searchTwo !== null) {
      searchTwo = searchTwo.value > nodeTwo.value ? searchTwo.left : searchTwo.right;
    }
  }
  const foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne;
  const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
  if (!foundNodeTwo || foundNodeFromOther) return false;
  return searchFromTarget(nodeTwo, searchOne === nodeTwo ? nodeThree : nodeOne);
}

function searchFromTarget(node, target) {
  while (node !== null && node !== target) {
    node = target.value < node.value ? node.left : node.right;
  }
  return node === target;
}
