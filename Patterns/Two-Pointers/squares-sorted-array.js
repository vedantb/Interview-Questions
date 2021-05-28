function squaresSortedArray(arr) {
  const squares = new Array(arr.length).fill(0);
  let highestSquareIdx = arr.length - 1;
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let leftSquare = arr[left] * arr[left];
    let rightSquare = arr[right] * arr[right];
    if (leftSquare > rightSquare) {
      squares[highestSquareIdx] = leftSquare;
      left += 1;
    } else {
      squares[highestSquareIdx] = rightSquare;
      right -= 1;
    }

    highestSquareIdx -= 1;
  }
  return squares;
}
