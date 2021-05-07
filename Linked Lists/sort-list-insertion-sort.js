let sortedInsertion = function (head, node) {
  if (!node) return head;
  if (!head || node.data <= head.data) {
    node.next = head;
    return node;
  }
  let curr = head;
  while (curr.next && curr.next.data < node.data) {
    curr = curr.next;
  }
  node.next = curr.next;
  curr.next = node;
  return head;
};

let insertionSort = function (head) {
  let sortedList = null;
  let curr = head;
  while (curr) {
    let temp = curr.next;
    sortedList = sortedInsertion(sortedList, curr);
    curr = temp;
  }
  return sortedList;
};
