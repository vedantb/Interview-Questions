const chai = require("chai");

function sortStack(stack) {
    if (stack.length === 0) return [];
    const top = stack.pop();
    sortStack(stack);
    insertIntoSortedStack(stack, top);
    return stack;
}

function insertIntoSortedStack(stack, value) {
    if (stack.length === 0 || stack[stack.length - 1] <= value) {
        stack.push(value);
        return;
    }
    const top = stack.pop();
    insertIntoSortedStack(stack, value);
    stack.push(top);
}

  const input = [-5, 2, -2, 4, 3, 1];
  const expected = [-5, -2, 1, 2, 3, 4];
  const actual = sortStack(input);
  chai.expect(actual).to.deep.equal(expected);