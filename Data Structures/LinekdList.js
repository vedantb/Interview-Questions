function LinkedListNode(val) {
  this.val = val;
  this.next = null;
}

class MyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(newVal) {
    const currentHead = this.head;
    const newNode = new LinkedListNode(newVal);
    newNode.next = currentHead;
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  }

  append(newVal) {
    const newNode = new LinkedListNode(newVal);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
}

let linkedlist1 = new MyLinkedList();
linkedlist1.prepend(25);
linkedlist1.prepend(15);
linkedlist1.prepend(5);
linkedlist1.append(99);

console.log(linkedlist1);
