// Insertion Sort
// Hint - Divide the input array into two subarrays in place. The first subarray should be sorted at all times and
// should start with length 1, while the second subarray is unsorted. Iterate through the unsorted array, inserting
// all of its elements into the sorted subarray in the correct position by swapping them into place.

function insertionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      let temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j -= 1;
    }
    return array;
  }
}
