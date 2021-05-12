let removeWhiteSpaces = function (s) {
  if (!s || s.length === 0) return;

  let readPtr = 0;
  let writePtr = 0;
  while (readPtr < s.length) {
    if (s[readPtr] !== " " && s[readPtr] != "\t") {
      s = s.substr(0, writePtr) + s[readPtr] + s.substr(writePtr + s[readPtr].length);
      writePtr++;
    }
    readPtr++;
  }
  s = s.substr(0, writePtr);
  return s;
};

console.log("Before: ", "All greek to me");
console.log("After: ", removeWhiteSpaces("All greek to me"));
