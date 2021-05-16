function kSortedArray(array, k) {
  const minHeapWithKElements = new MinHeap(array.slice(0, Math.min(k + 1, array.length)));

  let nextIndexToInsertElement = 0;

  for (let idx = k + 1; idx < array.length; idx++) {
    const minElement = minHeapWithKElements.remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;

    const currentElement = array[idx];
    minHeapWithKElements.insert(currentElement);
  }

  while (!minHeapWithKElements.isEmpty()) {
    const minElement = minHeapWithKElements.remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;
  }

  return array;
}

class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length === 0;
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
      const childTwoIdx = currentIdx * 2 + 2 ? currentIdx * 2 + 2 : -1;
      let idxToSwap = childOneIdx;
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      }
      if (heap[idxToSwap] < heap[currentIdx]) {
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
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
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
