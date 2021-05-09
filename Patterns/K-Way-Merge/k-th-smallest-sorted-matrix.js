const Heap = require("collections/heap");

const find_Kth_smallest = function (matrix, k) {
  let minHeap = new Heap([], null, (a, b) => b[0] - a[0]);

  for (let i = 0; i < Math.min(k, matrix.length); i++) {
    minHeap.push([matrix[i][0], 0, matrix[i]]);
  }

  let numberCount = 0;
  let number = 0;
  while (minHeap.length > 0) {
    let [minNumber, i, row] = minHeap.pop();
    numberCount++;
    if (numberCount === k) {
      number = minNumber;
      break;
    }
    if (row.length > i + 1) {
      minHeap.push(row[i + 1], i + 1, matrix[i]);
    }
  }
  return number;
};

console.log(
  `Kth smallest number is: ${find_Kth_smallest(
    [
      [2, 6, 8],
      [3, 7, 10],
      [5, 8, 11]
    ],
    5
  )}`
);
