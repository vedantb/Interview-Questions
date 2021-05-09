const Heap = require("collections/heap");

const find_Kth_smallest = function (lists, k) {
  let minHeap = new Heap([], null, (a, b) => b[0] - a[0]);

  for (let i = 0; i < lists.length; i++) {
    minHeap.push([lists[i][0], 0, lists[i]]);
  }

  let numberCount = 0;
  let kthSmallest = 0;

  while (minHeap.length > 0) {
    let [minNumber, i, list] = minHeap.pop();
    numberCount += 1;

    if (numberCount === k) {
      kthSmallest = minNumber;
      break;
    }
    if (list.length > i + 1) {
      minHeap.push([lists[i][i + 1], i + 1, list]);
    }
  }
  return kthSmallest;
};

console.log(
  `Kth smallest number is: ${find_Kth_smallest(
    [
      [2, 6, 8],
      [3, 6, 7],
      [1, 3, 4]
    ],
    5
  )}`
);
