function circularArrayCycle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let isForward = arr[i] > 0;
    let slow = i;
    let fast = i;

    while (true) {
      slow = findNextIndex(arr, isForward, slow);
      fast = findNextIndex(arr, isForward, fast);
      if (fast !== -1) {
        fast = findNextIndex(arr, isForward, fast);
      }
      if (slow === -1 || fast === -1 || slow === fast) {
        break;
      }
    }

    if (slow !== -1 && slow === fast) {
      return true;
    }
  }
  return false;
}

function findNextIndex(arr, isForward, currentIndex) {
  let direction = arr[currentIndex] >= 0;
  if (isForward !== direction) return -1;

  let nextIndex = (currentIndex + arr[currentIndex]) % arr.length;
  if (nextIndex < 0) {
    nextIndex += arr.length;
  }

  if (nextIndex === currentIndex) return -1;
  return nextIndex;
}

console.log(circularArrayCycle([1, 2, -1, 2, 2]));
console.log(circularArrayCycle([2, 2, -1, 2]));
console.log(circularArrayCycle([2, 1, -1, -2]));
