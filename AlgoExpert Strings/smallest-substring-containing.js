function smallestSubstringContaining(bigString, smallString) {
  const targetCharCounts = getCharCounts(smallString);
  const substringBounds = getSubstringBounds(bigString, targetCharCounts);
  return getStringFromBounds(bigString, substringBounds);
}

function getCharCounts(string) {
  const charCounts = {};
  for (const char of string) {
    increaseCharCount(char, charCounts);
  }
  return charCounts;
}

function getSubstringBounds(string, targetCharCounts) {
  let substringBounds = [0, Infinity];
  const substringCharCounts = {};
  const numUniqueCharacters = Object.keys(targetCharCounts).length;
  let numUniqueCharsDone = 0;
  let leftIdx = 0;
  let rightIdx = 0;

  while (rightIdx < string.length) {
    const rightChar = string[rightIdx];
    if (!(rightChar in targetCharCounts)) {
      rightIdx++;
      continue;
    }
    increaseCharCount(rightChar, substringCharCounts);
    if (substringCharCounts[rightChar] === targetCharCounts[rightChar]) {
      numUniqueCharsDone++;
    }

    while (numUniqueCharsDone === numUniqueCharacters && leftIdx <= rightIdx) {
      substringBounds =
        rightIdx - leftIdx < substringBounds[1] - substringBounds[0] ? [leftIdx, rightIdx] : substringBounds;

      const leftChar = string[leftIdx];

      if (!(leftChar in targetCharCounts)) {
        leftIdx++;
        continue;
      }

      if (substringCharCounts[leftChar] === targetCharCounts[leftChar]) {
        numUniqueCharsDone--;
      }
      decreaseCharCount(leftChar, substringCharCounts);
      leftIdx++;
    }

    rightIdx++;
  }
  return substringBounds;
}

function getStringFromBounds(string, bounds) {
  const [start, end] = bounds;
  if (end === Infinity) return "";
  return string.slice(start, end + 1);
}

function increaseCharCount(char, charCounts) {
  charCounts[char] = (charCounts[char] || 0) + 1;
}

function decreaseCharCount(char, charCounts) {
  charCounts[char]--;
}

console.log(smallestSubstringContaining("abcd$ef$axb$c$", "$$abf"));
console.log(smallestSubstringContaining("abcdef", "fa"));
console.log(smallestSubstringContaining("abcdef", "f"));
