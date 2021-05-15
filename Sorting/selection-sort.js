function selectionSort(array) {
  let startIdx = 0;
  while (startIdx < array.length) {
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < array.length; i++) {
      if (array[smallestIdx] > array[i]) smallestIdx = i;
    }
    let temp = array[smallestIdx];
    array[smallestIdx] = array[startIdx];
    array[startIdx] = temp;
    startIdx++;
  }
  return array;
}

console.log(selectionSort([5, 3, 2, 4, 1]));
