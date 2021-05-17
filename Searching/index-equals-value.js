function indexEqualsValue(array) {
  let resultIndex = Infinity;
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const potentialMatch = array[mid];
    if (potentialMatch === mid) {
      resultIndex = mid < resultIndex ? mid : resultIndex;
      right = mid - 1;
    } else if (potentialMatch > mid) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return resultIndex === Infinity ? -1 : resultIndex;
}

console.log(indexEqualsValue([-5, -3, 0, 2, 3, 7, 9]));
