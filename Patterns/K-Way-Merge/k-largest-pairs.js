let Heap = require("collections/heap");
const find_k_largest_pairs = function (nums1, nums2, k) {
  const minHeap = new Heap([], null, (a, b) => b[0] - a[0]);

  for (let i = 0; i < Math.min(k, nums1.length); i++) {
    for (let j = 0; j < Math.min(k, nums2.length); j++) {
      if (minHeap.length < k) {
        minHeap.push([nums1[i] + nums2[j], i, j]);
      } else {
        if (nums1[i] + nums2[j] < minHeap.peek()[0]) {
          break;
        } else {
          minHeap.pop();
          minHeap.push([nums1[i] + nums2[j], i, j]);
        }
      }
    }
  }

  const result = [];
  minHeap.forEach((a) => {
    result.push([nums1[(a[1], nums2[a[2]])]]);
  });
  return result;
};

console.log("Pairs with largest sum are: ");
const result = find_k_largest_pairs([9, 8, 2], [6, 3, 1], 3);
result.forEach((a) => {
  console.log(`[${a[0]}, ${a[1]}] `);
});
