const Heap = require("collections/heap");

class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function merge_lists(lists) {
  const minHeap = new Heap([], null, (a, b) => b.value - a.value);

  lists.forEach((a) => {
    if (a !== null) {
      minHeap.push(a);
    }
  });

  let resultHead = null;
  let resultTail = null;

  while (minHeap.length > 0) {
    const node = minHeap.pop();
    if (resultHead === null) {
      resultHead = resultTail = node;
    } else {
      resultTail.next = node;
      resultTail = node;
    }
    if (node.next !== null) {
      minHeap.push(node.next);
    }
  }

  return resultHead;
}

const l1 = new ListNode(2);
l1.next = new ListNode(6);
l1.next.next = new ListNode(8);

const l2 = new ListNode(3);
l2.next = new ListNode(6);
l2.next.next = new ListNode(7);

const l3 = new ListNode(1);
l3.next = new ListNode(3);
l3.next.next = new ListNode(4);

let result = merge_lists([l1, l2, l3]);
process.stdout.write("Here are the elements form the merged list: ");
while (result !== null) {
  process.stdout.write(`${result.value} `);
  result = result.next;
}
