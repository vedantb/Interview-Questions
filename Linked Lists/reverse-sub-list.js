class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  get_list() {
    result = "";
    temp = this;
    while (temp !== null) {
      result += temp.value + " ";
      temp = temp.next;
    }
    return result;
  }
}

const reverseList = function (head, count) {
  if (!head || !head.next) return head;
  let currentHead = head.next;
  let reversedHead = head;
  let reversedTail = head;
  reversedHead.next = null;

  while (currentHead && count > 0) {
    let temp = currentHead;
    currentHead = currentHead.next;
    temp.next = reversedHead;
    reversedHead = temp;
    count--;
  }
  return { reversedHead, reversedTail };
};

const reverse_sub_list = function (head, p, q) {
  if (!head) return null;

  let prev = null;
  let current = head;
  let nodeAfterReverse = current;
  let reverseLength = q - p;
  p--;
  q--;
  while (current && p > 0) {
    prev = current;
    current = current.next;
    p--;
    q--;
  }
  nodeAfterReverse = current;
  while (nodeAfterReverse && q >= 0) {
    nodeAfterReverse = nodeAfterReverse.next;
    q--;
  }

  let { reversedHead, reversedTail } = reverseList(current, reverseLength);
  prev.next = reversedHead;
  reversedTail.next = nodeAfterReverse;

  return head;
};

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(`Nodes of reversed LinkedList are: ${reverse_sub_list(head, 2, 4).get_list()}`);
