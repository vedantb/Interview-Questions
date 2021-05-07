let mergeAlternatingLists = function (list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  let head = list1;
  while (list1.next && list2) {
    let temp = list2;
    list2 = list2.next;
    temp.next = list1.next;
    list1.next = temp;
    list1 = temp.next;
  }

  if (!list1.next) {
    list1.next = list2;
  }

  return head;
};

let reverseEvenNodes = function (head) {
  let curr = head;
  let listEven = null;

  while (curr && curr.next) {
    let even = curr.next;
    curr.next = even.next;
    even.next = listEven;
    listEven = even;
    curr = curr.next;
  }
  return mergeAlternatingLists(head, listEven);
};
