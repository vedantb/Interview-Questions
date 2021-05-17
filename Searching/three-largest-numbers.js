function findThreeLargestNumbers(array) {
  let threeLargest = [null, null, null];
  for (const num of array) {
    updateThreeLargest(threeLargest, num);
  }
  return threeLargest;
}

function updateThreeLargest(threeLargest, num) {
  if (threeLargest[2] === null || num > threeLargest[2]) {
    shiftAndUpdate(threeLargest, num, 2);
  } else if (threeLargest[1] === null || num > threeLargest[1]) {
    shiftAndUpdate(threeLargest, num, 1);
  } else if (threeLargest[0] === null || num > threeLargest[0]) {
    shiftAndUpdate(threeLargest, num, 0);
  }
}

function shiftAndUpdate(array, num, idx) {
  let i;
  for (i = 0; i < idx; i++) {
    array[i] = array[i + 1];
  }
  array[i] = num;
}
