let reverse = function (head) {
  if (!head || !head.next) return head;

  let currentHead = head.next;
  let reversedList = head;
  reversedList.next = null;

  while (currentHead) {
    let temp = currentHead;
    currentHead = currentHead.next;
    temp.next = reversedList;
    reversedList = temp;
  }
  return reversedList;
};

let reverseRecursive = function (head) {
  if (!head || !head.next) return head;

  let reverseHead = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return reverseHead;
};
