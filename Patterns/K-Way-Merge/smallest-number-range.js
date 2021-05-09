let Heap = require("collections/heap");

const find_smallest_range = function (lists) {
  let minHeap = new Heap([], null, (a, b) => b[0] - a[0]);
  let rangeStart = 0;
  let rangeEnd = Infinity;
  let currentMaxNumber = -Infinity;

  lists.forEach((list) => {
    minHeap.push(list[0], 0, list);
    currentMaxNumber = Math.max(currentMaxNumber, list[0]);
  });

  while (minHeap.length === lists.length) {
    const [num, i, list] = minHeap.pop();
    if (rangeEnd - rangeStart > currentMaxNumber - num) {
      rangeStart = num;
      rangeEnd = currentMaxNumber;
    }
    if (list.length > i + 1) {
      minHeap.push(list[i + 1], i + 1, list);
      currentMaxNumber = Math.max(currentMaxNumber, list[i + 1]);
    }
  }
  return [rangeStart, rangeEnd];
};

console.log(
  `Smallest range is: ${find_smallest_range([
    [1, 5, 8],
    [4, 12],
    [7, 8, 10]
  ])}`
);
