const findSubstring = function (str, pattern) {
  let windowStart = 0;
  let matched = 0;
  let substrStart = 0;
  let minLength = str.length + 1;
  let patternFrequency = {};

  for (let char of pattern) {
    if (!(char in patternFrequency)) {
      patternFrequency[char] = 0;
    }
    patternFrequency[char] += 1;
  }

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    let rightChar = str[windowEnd];
    if (rightChar in patternFrequency) {
      patternFrequency[rightChar] -= 1;
      if (patternFrequency[rightChar] >= 0) {
        matched += 1;
      }
    }

    while (matched === pattern.length) {
      if (minLength > windowEnd - windowStart + 1) {
        minLength = windowEnd - windowStart + 1;
        substrStart = windowStart;
      }

      const leftChar = str[windowStart];
      windowStart += 1;
      if (leftChar in patternFrequency) {
        if (patternFrequency[leftChar] === 0) {
          matched -= 1;
        }
        patternFrequency[leftChar] += 1;
      }
    }
  }
  if (minLength > str.length) return "";

  return str.substring(substrStart, substrStart + minLength);
};

console.log(findSubstring("aabdec", "abc"));
console.log(findSubstring("abdbca", "abc"));
console.log(findSubstring("adcad", "abc"));
