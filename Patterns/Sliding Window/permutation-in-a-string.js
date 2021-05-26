// Given a string and a pattern, find out if the string contains any permutation of the pattern.
// Input: String="oidbcaf", Pattern="abc"
// Output: true
// Explanation: The string contains "bca" which is a permutation of the given pattern.

const findPermutation = function (str, pattern) {
  let windowStart = 0;
  let matched = 0;
  let patternFrequency = {};

  for (i = 0; i < pattern.length; i++) {
    const chr = pattern[i];
    if (!(chr in patternFrequency)) {
      patternFrequency[chr] = 0;
    }
    patternFrequency[chr] += 1;
  }

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (rightChar in patternFrequency) {
      // Decrement the frequency of matched character
      patternFrequency[rightChar] -= 1;
      if (patternFrequency[rightChar] === 0) {
        matched += 1;
      }
    }

    if (matched === Object.keys(patternFrequency).length) {
      return true;
    }

    // shrink the sliding window
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

console.log(`Permutation exist: ${findPermutation("oidbcaf", "abc")}`);
console.log(`Permutation exist: ${findPermutation("odicf", "dc")}`);
console.log(`Permutation exist: ${findPermutation("bcdxabcdy", "bcdyabcdx")}`);
console.log(`Permutation exist: ${findPermutation("aaacb", "abc")}`);
