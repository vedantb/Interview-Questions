let anagramsPattern = function (str, pattern) {
  let windowStart = 0;
  let result = [];
  let matched = 0;
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
      if (patternFrequency[rightChar] === 0) {
        matched += 1;
      }
    }

    if (matched === Object.keys(patternFrequency).length) {
      result.push(windowStart);
    }

    if (windowEnd >= pattern.length - 1) {
      let leftChar = str[windowStart];
      windowStart++;
      if (leftChar in patternFrequency) {
        if (patternFrequency[leftChar] === 0) {
          matched -= 1;
        }
        patternFrequency[leftChar] += 1;
      }
    }
  }
  return result;
};

console.log(anagramsPattern("ppqp", "pq"));
console.log(anagramsPattern("abbcabc", "abc"));
