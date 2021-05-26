const fruitsIntoBaskets = function (fruits) {
  let fruitsFrequency = {};
  let windowStart = 0;
  let maxLen = 0;
  for (let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
    let currentFruit = fruits[windowEnd];
    if (!(currentFruit in fruitsFrequency)) {
      fruitsFrequency[currentFruit] = 0;
    }
    fruitsFrequency[currentFruit] += 1;
    while (Object.keys(fruitsFrequency).length > 2) {
      const leftFruit = fruits[windowStart];
      fruitsFrequency[leftFruit] -= 1;
      if (fruitsFrequency[leftFruit] === 0) {
        delete fruitsFrequency[leftFruit];
      }
      windowStart += 1;
    }

    maxLen = Math.max(maxLen, windowEnd - windowStart + 1);
  }
  return maxLen;
};

console.log(`Maximum number of fruits: ${fruitsIntoBaskets(["A", "B", "C", "A", "C"])}`);
console.log(`Maximum number of fruits: ${fruitsIntoBaskets(["A", "B", "C", "B", "B", "C"])}`);
