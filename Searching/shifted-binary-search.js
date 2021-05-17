function shiftedBinarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const potentialMatch = array[middle];
    const leftNum = array[left];
    const rightNum = array[right];
    if (target === potentialMatch) {
      return middle;
    } else if (leftNum <= potentialMatch) {
      if (target < potentialMatch && target >= leftNum) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      if (target > potentialMatch && target <= rightNum) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  }
  return -1;
}
