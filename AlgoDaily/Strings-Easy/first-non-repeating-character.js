function firstNonRepeat(str) {
  let charCounter = {};

  for (let char of str) {
    charCounter[char] = (charCounter[char] || 0) + 1;
  }
  for (let char of str) {
    if (charCounter[char] === 1) return char;
  }
  return "";
}
