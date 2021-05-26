// Given a string with lowercase letters only, if you are allowed to replace no more than ‘k’ letters with any letter,
// find the length of the longest substring having the same letters after replacement.

// Example 1: String = "aabccbb" k = 2 Output = 5
// Replace the two 'c' with 'b' to get 'bbbbb'

const longestSubstringReplacement = function (str, k) {
  let windowStart = 0;
  let maxLen = 0;
  let charFrequency = {};
  let maxRepeatLetterCount = 0;
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    let rightChar = str[windowEnd];
    if (!(rightChar in charFrequency)) {
      charFrequency[rightChar] = 0;
    }
    charFrequency[rightChar] += 1;
    maxRepeatLetterCount = Math.max(maxRepeatLetterCount, charFrequency[rightChar]);

    if (windowEnd - windowStart + 1 - maxRepeatLetterCount > k) {
      let leftChar = str[windowStart];
      charFrequency[leftChar] -= 1;
      windowStart += 1;
    }

    maxLen = Math.max(maxLen, windowEnd - windowStart + 1);
  }
  return maxLen;
};

console.log(longestSubstringReplacement("aabccbb", 2));
console.log(longestSubstringReplacement("abbcb", 1));
console.log(longestSubstringReplacement("abccde", 1));
