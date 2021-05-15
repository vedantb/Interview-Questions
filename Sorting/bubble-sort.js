// Bubble Sort
// We're going to iterate over the array multiple times and each time we iterate through it, we're going to
// perform swaps to place numbers in their correcr order.
// Precisely, the first time we iterate through this array, we will traverse from start to the end and at any point
// each number, we're going to check if the current number and the number right next to it are in the correct order.
// If they are in the right order move on, else swap
// If you performed any swaps, you need to redo this
// Effectively in each iteration, we guarantee that the final number is in the right order/place

function bubbleSort(array) {
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      if (array[i] > array[i + 1]) {
        const temp = array[i + 1];
        array[i + 1] = array[i];
        array[i] = temp;
        isSorted = false;
      }
    }
    counter++;
  }
  return array;
}

// Time Complexity: O(n^2)
// Best Case Scenario: O(n) for a sorted array
// Space Complexity: O(1)
