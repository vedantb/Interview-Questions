function quickSelect(array, k) {
  const position = k - 1;
  return quickSelectHelper(array, 0, array.length - 1, position);
}

function quickSelectHelper(array, startIdx, endIdx, position) {
  while (startIdx <= endIdx) {
    const pivotIdx = startIdx;
    let leftIdx = pivotIdx + 1;
    let rightIdx = endIdx;
    while (leftIdx <= rightIdx) {
      if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
        [array[leftIdx], array[rightIdx]] = [array[rightIdx], array[leftIdx]];
      }
      if (array[leftIdx] <= array[pivotIdx]) {
        leftIdx++;
      }
      if (array[rightIdx] >= array[pivotIdx]) {
        rightIdx--;
      }
    }
    [array[pivotIdx], array[rightIdx]] = [array[rightIdx], array[pivotIdx]];
    if (rightIdx === position) {
      return array[rightIdx];
    } else if (rightIdx < position) {
      startIdx = rightIdx + 1;
    } else {
      endIdx = rightIdx - 1;
    }
  }
}
