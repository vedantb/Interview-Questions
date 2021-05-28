const minimumWindowSort = function (arr) {
  let pointer1 = 0;
  let pointer2 = arr.length - 1;

  while (pointer1 < arr.length - 1 && arr[pointer1] <= arr[pointer1 + 1]) {
    pointer1 += 1;
  }

  if (pointer1 === arr.length - 1) return 0;

  while (pointer2 > 0 && arr[pointer2] > arr[pointer2 - 1]) {
    pointer2 -= 1;
  }

  let subarrayMax = -Infinity;
  let subarrayMin = Infinity;
  for (let k = pointer1; k < pointer2 + 1; k++) {
    subarrayMax = Math.max(subarrayMax, arr[k]);
    subarrayMin = Math.min(subarrayMin, arr[k]);
  }

  while (pointer1 > 0 && arr[pointer1 - 1] > subarrayMin) {
    pointer1 -= 1;
  }

  while (pointer2 < arr.length - 1 && arr[pointer2 + 1] < subarrayMax) {
    pointer2 += 1;
  }

  return pointer2 - pointer1 + 1;
};
