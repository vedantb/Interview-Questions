let intersect = function (head1, head2) {
  let list1node = null;
  let list1length = get_length(head1);
  let list2node = null;
  let list2length = get_length(head2);

  let length_difference = 0;
  if (list1length >= list2length) {
    length_difference = list1length - list2length;
    list1node = head1;
    list2node = head2;
  } else {
    length_difference = list2length - list1length;
    list1node = head2;
    list2node = head1;
  }

  while (length_difference > 0) {
    list1node = list1node.next;
    length_difference--;
  }

  while (list1node) {
    if (list1node === list2node) {
      return list1node.data;
    }
    list1node = list1node.next;
    list2node = list2node.next;
  }

  return head1.data;
};

let get_length = function (head) {
  let list_length = 0;
  while (head) {
    head = head.next;
    list_length++;
  }

  return list_length;
};
