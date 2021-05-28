let backspaceCompare = function (str1, str2) {
  let str1CurrentIndex = str1.length - 1;
  let str2CurrentIndex = str2.length - 1;
  while (str1CurrentIndex >= 0 || str2CurrentIndex >= 0) {
    // get valid indexes to compare after eliminating backspaces
    let validStr1Index = getNextValidIndex(str1, str1CurrentIndex);
    let validStr2Index = getNextValidIndex(str2, str2CurrentIndex);

    // reached end of both strings
    if (validStr1Index < 0 && validStr2Index < 0) return true;
    // reached end of one of the strings
    if (validStr1Index < 0 || validStr2Index < 0) return false;
    // not equal
    if (str1[validStr1Index] !== str2[validStr2Index]) return false;

    str1CurrentIndex = validStr1Index - 1;
    str2CurrentIndex = validStr2Index - 1;
  }
  return true;
};

let getNextValidIndex = function (str, index) {
  let backspaceCount = 0;
  while (index > 0) {
    if (str[index] === "#") {
      backspaceCount += 1;
    } else if (backspaceCount > 0) {
      backspaceCount -= 1;
    } else {
      break;
    }
    index -= 1;
  }
  return index;
};

console.log(backspaceCompare("xy#z", "xzz#"));
console.log(backspaceCompare("xy#z", "xyz#"));
console.log(backspaceCompare("xp#", "xyz##"));
console.log(backspaceCompare("xywrrmp", "xywrrmu#p"));
