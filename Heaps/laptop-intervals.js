function laptopRentals(times) {
  if (times.length === 0) return 0;

  times.sort((a, b) => a[0] - b[0]);

  const timesWhenLaptopIsUsed = [times[0]];
  const heap = new MinHeap(timesWhenLaptopIsUsed);

  for (let idx = 1; idx < times.length; idx++) {
    const currentInterval = times[idx];
    if (heap.peek()[1] <= currentInterval[0]) {
      heap.remove();
    }
    heap.insert(currentInterval);
  }

  return timesWhenLaptopIsUsed.length;
}

class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap = childOneIdx;
      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      }
      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        [heap[idxToSwap], heap[currentIdx]] = [heap[currentIdx], heap[idxToSwap]];
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
      [heap[currentIdx], heap[parentIdx]] = [heap[parentIdx], heap[currentIdx]];
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    [this.heap[0], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[0]];
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }
}
