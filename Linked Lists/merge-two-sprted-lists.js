let mergeSorted = function (head1, head2) {
  if (!head1) {
    return head2;
  } else if (!head2) {
    return head1;
  }
  let mergeHead = null;

  if (head1.data <= head2.data) {
    mergeHead = head1;
    head1 = head1.next;
  } else {
    mergeHead = head2;
    head2 = head2.next;
  }

  let mergeTail = mergeHead;

  while (head1 && head2) {
    let temp = null;
    if (head1.data <= head2.data) {
      temp = head1;
      head1 = head1.next;
    } else {
      temp = head2;
      head2 = head2.next;
    }
    mergeTail.next = temp;
    mergeTail = temp;
  }

  if (head1) {
    mergeTail.next = head1;
  } else if (head2) {
    mergeTail.next = head2;
  }

  return mergeHead;
};
