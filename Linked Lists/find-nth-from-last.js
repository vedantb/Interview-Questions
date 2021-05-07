let findNthFromLast = function (head, n) {
  if (!head || n < 1) return null;

  let fast = head;
  while (fast && n > 0) {
    fast = fast.next;
    n--;
  }

  if (n !== 0) return null;

  while (fast) {
    fast = fast.next;
    head = head.next;
  }

  return head.data;
};
