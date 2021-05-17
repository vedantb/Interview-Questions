/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  const maxHeapWithKPoints = new MaxHeap(
    DIST_FUNC,
    points.slice(0, Math.min(k, points.length))
  );

  let closestPoints = [];
  for (let idx = k; idx < points.length; idx++) {
    const currPoint = points[idx];
    maxHeapWithKPoints.insert(currPoint);
    maxHeapWithKPoints.remove();
  }

  while (!maxHeapWithKPoints.isEmpty()) {
    const closePoint = maxHeapWithKPoints.remove();
    closestPoints.push(closePoint);
  }

  return closestPoints;
};

function DIST_FUNC(a, b) {
  return a[0] * a[0] + a[1] * a[1] > b[0] * b[0] + b[1] * b[1];
}

class MaxHeap {
  constructor(comparisonFunc, array) {
    this.comparisonFunc = comparisonFunc;
    this.heap = this.buildHeap(array);
  }

  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    // only proceed if there's at least one child
    while (childOneIdx <= endIdx) {
      const childTwoIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (
        childTwoIdx !== -1 &&
        this.comparisonFunc(heap[childTwoIdx], heap[childOneIdx])
      ) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (this.comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (
      currentIdx > 0 &&
      this.comparisonFunc(heap[currentIdx], heap[parentIdx])
    ) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i, j, heap) {
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}
