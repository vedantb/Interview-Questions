let regxMatch = function (text, pattern) {
  let matrix = [];

  // Initializing the matrix with all 0s
  for (let i = 0; i <= text.length; i++) {
    matrix.push(new Array(pattern.length + 1).fill(false));
  }
  matrix[0][0] = true;

  // Deals with patterns like a* or a*b*
  for (let i = 1; i < matrix[0].length; i++) {
    if (pattern[i - 1] === "*") {
      matrix[0][i] = matrix[0][i - 2];
    }
  }

  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (pattern[j - 1] === "." || pattern[j - 1] === text[i - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else if (pattern[j - 1] === "*") {
        matrix[i][j] = matrix[i][j - 2];
        if (pattern[j - 2] === "." || pattern[j - 2] === text[i - 1]) {
          matrix[i][j] = matrix[i][j] || matrix[i - 1][j];
        }
      } else {
        matrix[i][j] = false;
      }
    }
  }

  return matrix[text.length][pattern.length];
};

console.log(regxMatch("aaa", "ab*acd*a"));
