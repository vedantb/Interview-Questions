let addIntegers = function (integer1, integer2) {
  let result = null;
  let last = null;
  let carry = 0;

  while (integer1 || integer2 || carry > 0) {
    let first = !interger1 ? 0 : interger1.data;
    let second = !integer2 ? 0 : integer2.data;
    let sum = first + second + carry;

    let pNew = new Node(sum % 10);
    carry = Math.floow(sum / 10);

    if (!result) {
      result = pNew;
    } else {
      last.next = pNew;
    }
    last = pNew;

    if (integer1) {
      interger1 = integer1.next;
    }

    if (integer2) {
      integer2 = integer2.next;
    }
  }

  return result;
};
