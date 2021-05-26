// Given a string, find the length of the longest substring in it
// with no more than K distinct characters.
// Assume that K is <= length of string

const longestSubstringWithKDistinct = function (str, k) {
  let windowStart = 0;
  let maxLength = 0;
  let charFrequency = {};

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (!(rightChar in charFrequency)) {
      charFrequency[rightChar] = 0;
    }
    charFrequency[rightChar] += 1;

    //shrink sliding window until we have 'k' disinct characters
    while (Object.keys(charFrequency).length > k) {
      const leftChar = str[windowStart];
      charFrequency[leftChar] -= 1;
      if (charFrequency[leftChar] === 0) {
        delete charFrequency[leftChar];
      }
      windowStart += 1;
    }

    // update the max length so far
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
};

console.log(longestSubstringWithKDistinct("araaci", 2));
console.log(longestSubstringWithKDistinct("araaci", 1));
console.log(longestSubstringWithKDistinct("cbbebi", 3));
