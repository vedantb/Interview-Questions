// NAIVE METHOD: O(mn)
function hasSubstring(text, pattern) {
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < text.length && j < pattern.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    } else {
      i = i - j + 1;
      j = 0;
    }
  }
  if (j === pattern.length) return true;

  return false;
}

function computePatternArray(pattern) {
  let lps = [0];
  let index = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[index]) {
      lps[i] = index + 1;
      index++;
      i++;
    } else {
      if (index !== 0) {
        index = lps[index - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

// O(m + n) time: computing the array takes O(n) time
// and the basic search takes O(m) time
function hasSubstringKMP(text, pattern) {
  let lps = computePatternArray(pattern);
  let i = 0;
  let j = 0;
  while (i < text.length && j < pattern.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    } else {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  if (j === pattern.length) return true;

  return false;
}

console.log(hasSubstringKMP("abcxabcdabcdabcy", "abcdabcy"));
console.log(hasSubstringKMP("vedantbhatt", "that"));
