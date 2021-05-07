class ParenthesesString {
  constructor(str, openCount, closeCount) {
    this.str = str;
    this.openCount = openCount;
    this.closeCount = closeCount;
  }
}

function generateValidParens(num) {
  let result = [];
  let queue = [];
  queue.push(new ParenthesesString("", 0, 0));
  while (queue.length > 0) {
    const ps = queue.shift();
    // if we've reached the maximum number of open and close parentheses, add to the result
    if (ps.openCount === num && ps.closeCount === num) {
      result.push(ps.str);
    } else {
      if (ps.openCount < num) {
        queue.push(new ParenthesesString(`${ps.str}(`, ps.openCount + 1, ps.closeCount));
      }
      if (ps.openCount > ps.closeCount) {
        queue.push(new ParenthesesString(`${ps.str})`, ps.openCount, ps.closeCount + 1));
      }
    }
  }
  return result;
}

console.log(`All combinations of balanced parentheses are: ${generateValidParens(2)}`);
console.log(`All combinations of balanced parentheses are: ${generateValidParens(3)}`);
