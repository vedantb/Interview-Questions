class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  get_list() {
    let result = "";
    let temp = this;
    while (temp !== null) {
      result += temp.value + " ";
      temp = temp.next;
    }
    return result;
  }
}

const reverse_every_k_elements = function (head, k) {
  if (!head || k <= 1) return head;

  let current = head;
  let prev = null;

  while (true) {
    const lastNodeOfPrevPart = prev;
    const lastNodeOfSubList = current;
    let next = null;
    let i = 0;
    while (current !== null && i < k) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      i++;
    }

    if (lastNodeOfPrevPart !== null) {
      lastNodeOfPrevPart.next = prev;
    } else {
      head = prev;
    }

    // connect with the next part
    lastNodeOfSubList.next = current;
    if (current === null) break;
    prev = lastNodeOfSubList;
  }

  return head;
};

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(`Nodes of reversed LinkedList are: ${reverse_every_k_elements(head, 3).get_list()}`);
