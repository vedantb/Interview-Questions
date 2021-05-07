let reverseKNodes = function (head, k) {
  if (!head || k <= 1) return head;

  let reversed = null;
  let prevTail = null;

  while (head && k > 0) {
    let currentHead = null;
    let currentTail = head;

    let n = k;
    while (head && n > 0) {
      let temp = head.next;
      head.next = currentHead;
      currentHead = head;
      head = temp;
      n--;
    }

    if (!reversed) {
      reversed = currentHead;
    }

    if (prevTail) {
      prevTail.next = currentHead;
    }

    prevTail = currentTail;
  }
  return reversed;
};
