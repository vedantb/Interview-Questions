let splitInHalf = function (head, firstSecond) {
  if (!head) {
    firstSecond.first = null;
    firstSecond.second = null;
    return;
  }

  if (!head.next) {
    firstSecond.first = head;
    firstSecond.second = null;
  } else {
    let slow = head;
    let fast = head.next;
    while (fast) {
      fast = fast.next;
      if (fast) {
        fast = fast.next;
        slow = slow.next;
      }
    }

    firstSecond.first = head;
    firstSecond.second = slow.next;
    slow.next = null;
  }
};

let mergeSortedLists = function (first, second) {
  if (!first) return second;
  if (!second) return first;

  let newHead = null;

  if (first.data <= second.data) {
    newHead - first;
    first = first.next;
  } else {
    newHead = second;
    second = second.next;
  }

  let newCurrent = newHead;
  while (first && second) {
    let temp = null;
    if (first.data <= second.data) {
      temp = first;
      first = first.next;
    } else {
      temp = second;
      second = second.next;
    }
    newCurrent.next = temp;
    newCurrent = temp;
  }

  if (first) {
    newCurrent.next = first;
  } else if (second) {
    newCurrent.next = second;
  }
  return newHead;
};

let mergeSort = function (head) {
  if (!head || !head.next) {
    return head;
  }

  let first = null;
  let second = null;
  let firstSecond = { first, second };

  splitInHalf(head, firstSecond);

  firstSecond.first = mergeSort(firstSecond.first);
  firstSecond.second = mergeSort(firstSecond.second);

  return mergeSortedLists(firstSecond.first, firstSecond.second);
};
