const removeDuplicates = function (arr) {
  let writePointer = 1;
  for (let readPointer = 1; readPointer < arr.length; readPointer++) {
    if (arr[readPointer] !== arr[readPointer - 1]) {
      arr[writePointer] = arr[readPointer];
      writePointer++;
    }
  }
  return writePointer;
};

console.log(removeDuplicates([2, 3, 3, 3, 6, 9, 9]));
console.log(removeDuplicates([2, 2, 2, 11]));
