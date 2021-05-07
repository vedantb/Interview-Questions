let swapNthNode = function (head, n) {
  let prev = null;
  let current = head;

  if (!head || n === 1) return head;

  let count = 1;
  while (current && count < n) {
    prev = current;
    current = current.next;
    count++;
  }

  if (!current) return head;

  prev.next = head;
  let temp = head.next;
  head.next = current.next;
  current.next = temp;

  return current;
};
