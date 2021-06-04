function mergeSort(arr, left, right) {
  let invCount = 0;
  if (left < right) {
    let mid = Math.floor((left + right) / 2);
    invCount += mergeSort(arr, left, mid);
    invCount += mergeSort(arr, mid + 1, right);
    invCount += merge(arr, left, mid, right);
  }
  return invCount;
}

function merge(arr, left, mid, right) {
  let i = left;
  let j = mid + 1;
  let invCount = 0;
  let k = i;
  while (i <= mid && j <= right) {
    k = i;
    //no inversions if arr[i] <= arr[j]
    if (arr[i] <= arr[j]) {
      i += 1;
    } else {
      while (k <= mid) {
        if (arr[k] > arr[j]) invCount += 1;
        k++;
      }
      j += 1;
    }
  }
  return invCount;
}

function countInversions(arr) {
  return mergeSort(arr, 0, arr.length - 1);
}
/**
 * left = 0, mid = 1, right = 2
 * i = 0, j = 2
 *
 */
console.log(countInversions([2, 4, 1, 3, 5]));
