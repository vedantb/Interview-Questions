const permutationString = function (str, pattern) {
  let windowStart = 0;
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

    if (matched === Object.keys(patternFrequency).length) return true;

    // shrink or slide the window
    if (windowEnd >= pattern.length - 1) {
      let leftChar = str[windowStart];
      windowStart += 1;
      if (leftChar in patternFrequency) {
        if (patternFrequency[leftChar] === 0) {
          matched -= 1;
        }
        patternFrequency[leftChar] += 1;
      }
    }
  }
  return false;
};

// TIME COMPLEXITY: O(N + M) where N and M are no. of characters in string and pattern
// SPACE COMPLEXITY: O(M)

console.log(`Permutation exist: ${permutationString("oidbcaf", "abc")}`);
console.log(`Permutation exist: ${permutationString("odicf", "dc")}`);
console.log(`Permutation exist: ${permutationString("bcdxabcdy", "bcdyabcdx")}`);
console.log(`Permutation exist: ${permutationString("aaacb", "abc")}`);
