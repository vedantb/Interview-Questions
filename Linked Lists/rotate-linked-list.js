let findLength = function (head) {
  let length = 0;
  let curr = head;
  while (curr) {
    length++;
    curr = curr.next;
  }
  return length;
};

let adjustRotationsNeeded = function (n, length) {
  n = n % length;
  if (n < 0) {
    n = n + length;
  }
  return n;
};

let rotateList = function (head, n) {
  if (!head || n === 0) return;

  // find length of linked list
  let length = findLength(head);
  n = adjustRotationsNeeded(n, length);
  if (n === 0) return head;

  let rotationsCount = length - n - 1;
  let temp = head;

  // After this loop temp will point to one node prior to rotation point
  while (rotationsCount > 0) {
    rotationsCount--;
    temp = temp.next;
  }

  let newHead = temp.next;
  temp.next = null;

  temp = newHead;
  while (temp.next) {
    temp = temp.next;
  }

  temp.next = head;

  return newHead;
};
