function patternMatcher(pattern, string) {
  let didSwitchPattern = false;
  let newPattern = getNewPattern(pattern);
  if (newPattern[0] !== pattern[0]) didSwitchPattern = true;
  let { firstYPosition, xyCounts } = getCountsAndFirstYPosition(newPattern);

  if (xyCounts["y"] !== 0) {
    for (let lenOfX = 1; lenOfX < string.length; lenOfX++) {
      const lenOfY = (string.length - lenOfX * xyCounts["x"]) / xyCounts["y"];
      if (lenOfY <= 0 || lenOfY % 1 !== 0) continue;
      const yIdx = firstYPosition * lenOfX;
      const x = string.slice(0, lenOfX);
      const y = string.slice(yIdx, yIdx + lenOfY);
      const potentialMatch = newPattern.map((char) => (char === "x" ? x : y));
      if (string === potentialMatch.join("")) {
        return !didSwitchPattern ? [x, y] : [y, x];
      }
    }
  } else {
    const lenOfX = string.length / xyCounts["x"];
    if (lenOfX % 1 === 0) {
      const x = string.slice(0, lenOfX);
      const potentialMatch = newPattern.map((char) => (char === "x" ? x : ""));
      if (string === potentialMatch.join("")) {
        return !didSwitchPattern ? [x, ""] : ["", x];
      }
    }
  }

  return [];
}

function getNewPattern(pattern) {
  const patternLetters = pattern.split("");
  if (patternLetters[0] === "x") {
    return patternLetters;
  }
  return patternLetters.map((char) => (char === "y" ? "x" : "y"));
}

function getCountsAndFirstYPosition(pattern) {
  let firstYPosition = null;
  let xyCounts = { x: 0, y: 0 };
  for (let idx = 0; idx < pattern.length; idx++) {
    xyCounts[pattern[idx]]++;
    if (pattern[idx] === "y" && firstYPosition === null) {
      firstYPosition = idx;
    }
  }
  return { firstYPosition, xyCounts };
}

console.log(patternMatcher("xxyxxy", "gogopowerrangergogopowerranger"));
console.log(patternMatcher("xyx", "aaaa"));
