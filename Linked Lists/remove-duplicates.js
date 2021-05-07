let removeDuplicates = function (head) {
  if (!head || !head.next) return head;

  let dupSet = new Set();
  dupSet.add(head.data);
  let curr = head;

  while (curr.next) {
    if (dupSet.has(curr.next.data)) {
      curr.next = curr.next.next;
    } else {
      dupSet.add(curr.next.data);
      curr = curr.next;
    }
  }
  return head;
};
