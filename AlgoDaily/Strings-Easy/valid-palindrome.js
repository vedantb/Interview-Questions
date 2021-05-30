// Test if a string is palindrome or not skipping non alphanumeric chars
function isPalindrome(str) {
  if (!str || str === "") return true;
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    let leftChar = str.charAt(left).toLowerCase();
    let rightChar = str.charAt(right).toLowerCase();

    const isLeftCharAlphaNumeric = isAlphaNumeric(leftChar);
    const isRightCharAlphaNumeric = isAlphaNumeric(rightChar);

    if (isLeftCharAlphaNumeric && isRightCharAlphaNumeric) {
      if (leftChar === rightChar) {
        left++;
        right--;
      } else {
        return false;
      }
    } else {
      if (!isLeftCharAlphaNumeric) {
        left++;
      }
      if (!isRightCharAlphaNumeric) {
        right--;
      }
    }
  }
  return true;
}

function isAlphaNumeric(char) {
  if (/[a-zA-Z0-9]/.test(char)) {
    return true;
  }
  return false;
}

console.log(isPalindrome("A Santa Lived As a Devil At NASA"));
