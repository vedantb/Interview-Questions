const palindromicSubstrings = (s) => {
  let count = 0;
  let matrix = [];

  // Initializing the matrix with all 0s
  for (let char of s) {
    matrix.push(new Array(s.length).fill(0));
  }

  // Initializing the diagonals of the matrix with 1s since
  // individual characters are always palindromes
  for (let i = 0; i < s.length; i++) {
    matrix[i][i] = 1;
  }

  for (let col = 1; col < s.length; col++) {
    for (let row = 0; row < col; row++) {
      if (row === col - 1 && s[col] === s[row]) {
        matrix[row][col] = 1;
        console.log(s.substring(row, col + 1));
        count++;
      } else if (matrix[row + 1][col - 1] === 1 && s[col] === s[row]) {
        matrix[row][col] = 1;
        console.log(s.substring(row, col + 1));
        count++;
      }
    }
  }

  return count;
};

let palindrome = "aabbbaa";

let palindrome_count = palindromicSubstrings(palindrome);
console.log("Total palindrome substrings: ", palindrome_count);
