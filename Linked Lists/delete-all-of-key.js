let deleteNode = function (head, key) {
  let prev = null;
  let current = head;
  while (current) {
    if (current.data === key) {
      if (current === head) {
        head = head.next;
        current = head;
      } else {
        prev.next = current.next;
        current = current.next;
      }
    } else {
      prev = current;
      current = current.next;
    }
  }
  return head;
};
