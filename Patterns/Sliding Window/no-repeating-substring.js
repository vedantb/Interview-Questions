// Given a string, find the length of the longest substring, which has no repeating characters.

// Example 1: String = "aabccbb" Output = 3 for "abc"
// Example 2: String = "abbbb" Output = 2 for "ab"
// Example 3: String = "abccde" Output = 3 for "abc" or "cde"

const nonRepeatingSubstring = function (str) {
  let windowStart = 0;
  let maxLength = 0;
  let charIndexMap = {};
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    let currentChar = str[windowEnd];
    // if the map already contains the char, shrink the window from the beginning so we just have one
    // occurence of that char
    if (currentChar in charIndexMap) {
      windowStart = Math.max(windowStart, charIndexMap[currentChar] + 1);
    }
    // store the index of currentChar in the map. This helps us shrink the window later
    charIndexMap[currentChar] = windowEnd;
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
};
