const PRIME = 101;
function rabinKarpSearch(text, pattern) {
  let m = pattern.length;
  let n = text.length;
  let patternHash = createHash(pattern, m - 1);
  let textHash = createHash(text, m - 1); // calculating the hash of the first m (pattern length) characters of the text
  for (let i = 1; i <= n - m + 1; i++) {
    if (patternHash === textHash && checkEqual(text, i - 1, i + m - 2, pattern, 0, m - 1)) {
      return i - 1;
    }
    if (i < n - m + 1) {
      textHash = recalculateHash(text, i - 1, i + m - 1, textHash, m);
    }
  }
  return -1;
}

function recalculateHash(str, oldIndex, newIndex, oldHash, patternLen) {
  let newHash = oldHash - str.charCodeAt(oldIndex);
  newHash = newHash / PRIME;
  newHash += str.charCodeAt(newIndex) * Math.pow(PRIME, patternLen - 1);
  return newHash;
}

function createHash(str, end) {
  let hash = 0;
  for (let i = 0; i <= end; i++) {
    hash += str.charCodeAt(i) * Math.pow(PRIME, i);
  }
  return hash;
}

function checkEqual(str1, start1, end1, str2, start2, end2) {
  if (end1 - start1 !== end2 - start2) return false;
  while (start1 <= end1 && start2 <= end2) {
    if (str1[start1] !== str2[start2]) return false;
    start1++;
    start2++;
  }
  return true;
}

console.log(rabinKarpSearch("dabc", "abc"));
console.log(rabinKarpSearch("abcxabcdabcdabcy", "abcdabcy"));
console.log(rabinKarpSearch("vedantbhatt", "that"));
