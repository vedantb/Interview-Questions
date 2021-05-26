class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    return this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.length - 1];
  }

  get length() {
    return this.stack.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}

const newStack = new Stack();
newStack.push(1);
newStack.push(2);
console.log(newStack);

newStack.pop();
console.log(newStack);
console.log(newStack.isEmpty());
