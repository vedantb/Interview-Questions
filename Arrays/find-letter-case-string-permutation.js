function findLetterCaseStringPermutation(str) {
  let permutations = [];
  permutations.push(str);

  // process every character of the string
  for (let i = 0; i < str.length; i++) {
    // only process characters, skip digits
    if (isNaN(parseInt(str[i], 10))) {
      const n = permutations.length;
      for (let j = 0; j < n; j++) {
        const chs = permutations[j].split(""); // string to array
        // if the current character is in upper case, change it to lower case or vice versa
        if (chs[i] === chs[i].toLowerCase()) {
          chs[i] = chs[i].toUpperCase();
        } else {
          chs[i] = chs[i].toLowerCase();
        }
        permutations.push(chs.join(""));
      }
    }
  }
  return permutations;
}

console.log(`String permutations are: ${findLetterCaseStringPermutation("ad52")}`);
console.log(`String permutations are: ${findLetterCaseStringPermutation("ab7c")}`);
