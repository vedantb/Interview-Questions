function mergeSort(array) {
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray);
  return array;
}

function mergeSortHelper(array, startIdx, endIdx, auxArray) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, middleIdx, array);
  mergeSortHelper(auxArray, middleIdx + 1, endIdx, array);
  doMerge(array, startIdx, middleIdx, endIdx, auxArray);
}

function doMerge(array, startIdx, middleIdx, endIdx, auxArray) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxArray[i] <= auxArray[j]) {
      array[k++] = auxArray[i++];
    } else {
      array[k++] = auxArray[j++];
    }
  }
  while (i <= middleIdx) {
    array[k++] = auxArray[i++];
  }
  while (j <= endIdx) {
    array[k++] = auxArray[j++];
  }
}
