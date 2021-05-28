class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function findCycleStart(head) {
  let cycleLength = 0;
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      cycleLength = calculateCycleLength(slow);
      break;
    }
  }
  return findStart(head, cycleLength);
}

function calculateCycleLength(slow) {
  let current = slow;
  let cycleLength = 0;
  while (true) {
    current = current.next;
    cycleLength += 1;
    if (current === slow) break;
  }
  return cycleLength;
}

function findStart(head, cycleLength) {
  let pointer1 = head;
  let pointer2 = head;
  while (cycleLength > 0) {
    pointer2 = pointer2.next;
    cycleLength--;
  }
  while (pointer1 !== pointer2) {
    pointer1 = pointer1.next;
    pointer2 = pointer2.next;
  }
  return pointer1;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

head.next.next.next.next.next.next = head.next.next;
console.log(`LinkedList cycle start: ${findCycleStart(head).value}`);

head.next.next.next.next.next.next = head.next.next.next;
console.log(`LinkedList cycle start: ${findCycleStart(head).value}`);

head.next.next.next.next.next.next = head;
console.log(`LinkedList cycle start: ${findCycleStart(head).value}`);
