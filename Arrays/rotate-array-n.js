let reverseArray = function (arr, start, end) {
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
};

let rotateArray = function (arr, n) {
  let len = arr.length;

  // Let's normalize rotations
  // if n > array size or n is negative.
  n = n % len;
  if (n < 0) {
    // calculate the positive rotations needed.
    n = n + len;
  }
  console.log(n, "n");
  console.log(arr, "aerr");
  console.log(arr.splice(-1, n));
};

let arr = [1, 10, 20, 0, 59, 86, 32, 11, 9, 40];

console.log("Array Before Rotation");
console.log(arr);

rotateArray(arr, 2);

console.log("Array After Rotation");
console.log(arr);
