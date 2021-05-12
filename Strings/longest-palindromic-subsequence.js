let findLPSLength = function (str) {
  let matrix = [];
  for (let char of str) {
    matrix.push(Array(str.length - 1).fill(0));
  }
  for (let i = 0; i < str.length; i++) {
    matrix[i][i] = 1;
  }

  for (let l = 2; l <= str.length; l++) {
    for (let i = 0; i < str.length - l + 1; i++) {
      let j = i + l - 1;
      if (l === 2 && str[i] === str[j]) {
        matrix[i][j] = 2;
      } else if (str[i] === str[j]) {
        matrix[i][j] = matrix[i + 1][j - 1] + 2;
      } else {
        matrix[i][j] = Math.max(matrix[i + 1][j], matrix[i][j - 1]);
      }
    }
  }

  return matrix[0][str.length - 1];
};

// The time and space complexity of the above algorithm is O(n^2) where ‘n’ is the length of the input sequence.

console.log("Length of LPS ---> " + findLPSLength("bccb"));
console.log("Length of LPS ---> " + findLPSLength("cddpd"));
console.log("Length of LPS ---> " + findLPSLength("pqr"));
