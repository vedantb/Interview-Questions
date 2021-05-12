let countPalindromicSubstrings = function (str) {
  let dp = Array(str.length)
    .fill(false)
    .map(() => Array(str.length).fill(0));

  let count = 0;

  for (let i = 0; i < str.length; i++) {
    dp[i][i] = true;
    count++;
  }

  for (let startIndex = str.length - 1; startIndex >= 0; startIndex--) {
    for (let endIndex = startIndex + 1; endIndex < str.length; endIndex++) {
      if (str[startIndex] === str[endIndex]) {
        if (endIndex - startIndex === 1 || dp[startIndex + 1][endIndex - 1]) {
          dp[startIndex][endIndex] = true;
          count++;
        }
      }
    }
  }

  return count;
};

const findLPSCount2 = function (str) {
  if (!str || str.length < 1) return "";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    count = expandAroundCenter(str, i, i, count);
    count = expandAroundCenter(str, i, i + 1, count);
  }

  return count;
};

let expandAroundCenter = function (str, left, right, count) {
  let L = left,
    R = right;

  while (L >= 0 && R < str.length && str[L] === str[R]) {
    L--;
    R++;
    count++;
  }

  return count;
};

console.log("Length of LPS: ---> " + findLPSCount2("abdbca"));

console.log("Length of LPS: ---> " + countPalindromicSubstrings("abdbca"));
console.log("Length of LPS: ---> " + countPalindromicSubstrings("cddpd"));
console.log("Length of LPS: ---> " + countPalindromicSubstrings("pqr"));
