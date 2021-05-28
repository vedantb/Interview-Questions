function findHappyNumber(num) {
  let slow = num;
  let fast = num;
  while (true) {
    slow = findSquareNum(slow);
    fast = findSquareNum(findSquareNum(fast));
    if (slow === fast) break;
  }
  return slow === 1;
}

function findSquareNum(num) {
  let sum = 0;
  while (num > 0) {
    let digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num / 10);
  }
  return sum;
}

console.log(findHappyNumber(23));
console.log(findHappyNumber(12));
