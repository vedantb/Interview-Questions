let removeDuplicates = function (str) {
  let hashSet = new Set([]);

  let writeIndex = 0;
  let readIndex = 0;
  while (readIndex < str.length) {
    if (!hashSet.has(str[readIndex])) {
      hashSet.add(str[readIndex]);
      str =
        str.substr(0, writeIndex) + str[readIndex] + str.substr(writeIndex + 1);
      writeIndex++;
    }
    readIndex++;
  }
  return str.substr(0, writeIndex);
};

console.log("Before: ", "dabbac");
console.log("After: ", removeDuplicates("dabbac"));
