class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function findMiddleOfLinkedList(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

console.log(`Middle Node: ${findMiddleOfLinkedList(head).value}`);

head.next.next.next.next.next = new Node(6);
console.log(`Middle Node: ${findMiddleOfLinkedList(head).value}`);

head.next.next.next.next.next.next = new Node(7);
console.log(`Middle Node: ${findMiddleOfLinkedList(head).value}`);
