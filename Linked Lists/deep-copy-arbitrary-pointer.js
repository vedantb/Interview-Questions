let deepCopyArbitraryPointer = function (head) {
  if (!head) return null;
  let current = head;
  let newHead = null;
  let newPrev = null;
  let ht = new Map();

  while (current) {
    let newNode = new LinkedListNode(current.data);
    newNode.arbitrary = current.arbitrary;

    if (newPrev) {
      newPrev.next = newNode;
    } else {
      newHead = newNode;
    }

    ht.set(current, newNode);
    newPrev = newNode;
    current = current.next;
  }

  let newCurrent = newHead;
  while (newCurrent) {
    if (newCurrent.arbitrary) {
      let node = ht.get(newCurrent.arbitrary);
      newCurrent.arbitrary = node;
    }
    newCurrent = newCurrent.next;
  }

  return newHead;
};

let deepCopyArbitraryPointer2 = function (head) {
  if (!head) return null;

  let current = head;
  while (current) {
    let newNode = new LinkedListNode(current.data);
    newNode.next = current.next;
    current.next = newNode;
    current = newNode.next;
  }

  current = head;
  while (current) {
    if (current.arbitrary) {
      current.next.arbitrary = current.arbitrary.next;
    }
    current = current.next.next;
  }

  // separating lists
  current = head;
  let newHHead = head.next;
  let copiedCurrent = newHHead;
  while (current) {
    copiedCurrent = current.next;
    current.next = copiedCurrent.next;

    if (copiedCurrent.next) {
      copiedCurrent.next = copiedCurrent.next.next;
    }

    current = current.next;
  }

  return newHHead;
};
