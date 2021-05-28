class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function isPalindromicLinkedList(head) {
  if (head === null || head.next == null) return true;

  let slow = head;
  let fast = head;

  // finding the middle of the linkedlist
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let headSecondHalf = reverse(slow);
  // copy of the head to reverse later
  copyHeadSecondHalf = headSecondHalf;

  while (head !== null && headSecondHalf !== null) {
    if (head.value !== headSecondHalf.value) {
      break;
    }
    head = head.next;
    headSecondHalf = headSecondHalf.next;
  }
  reverse(copyHeadSecondHalf);

  if (head === null || headSecondHalf === null) return true;

  return false;
}

function reverse(head) {
  let prev = null;
  while (head !== null) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

const head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(2);

console.log(`Is palindrome: ${isPalindromicLinkedList(head)}`);

head.next.next.next.next.next = new Node(2);
console.log(`Is palindrome: ${isPalindromicLinkedList(head)}`);
