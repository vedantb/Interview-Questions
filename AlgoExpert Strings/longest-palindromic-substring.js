function longestPalindromicSubstring(string) {
  if (!string || string.length < 1) return "";

  let currentLognestPalindrome = [0, 0];

  for (let i = 0; i < string.length; i++) {
    let oddLength = expandAroundCenter(string, i, i);
    let evenLength = expandAroundCenter(string, i, i + 1);
    let maxLength = oddLength[1] - oddLength[0] > evenLength[1] - evenLength[0] ? oddLength : evenLength;
    currentLognestPalindrome =
      currentLognestPalindrome[1] - currentLognestPalindrome[0] > maxLength[1] - maxLength[0]
        ? currentLognestPalindrome
        : maxLength;
  }

  return string.slice(currentLognestPalindrome[0], currentLognestPalindrome[1]);
}

function expandAroundCenter(string, left, right) {
  let L = left;
  let R = right;

  while (L >= 0 && R < string.length && string[L] === string[R]) {
    L--;
    R++;
  }

  return [L, R];
}
