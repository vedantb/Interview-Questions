const find_happy_number = function (num) {
  let slow = num;
  let fast = num;
  while (true) {
    slow = find_square_sum(slow);
    fast = find_square_sum(find_square_sum(fast));
    if (slow === fast) {
      break;
    }
  }
  return slow === 1;
};

const find_square_sum = function (num) {
  let sum = 0;
  while (num > 0) {
    digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num / 10);
  }
  return sum;
};

console.log(find_happy_number(23));
console.log(find_happy_number(12));
