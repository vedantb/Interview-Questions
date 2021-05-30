function reverseOnlyAlphabetical(str) {
  const alphaChars = [];
  str = str.split("");

  for (let char of str) {
    if (/[a-zA-Z]/.test(char)) {
      alphaChars.push(char);
    }
  }

  const reversedAlpha = reverse(alphaChars);
  let idxRA = 0;
  for (let i = 0; i < str.length; i++) {
    if (/[a-zA-Z]/.test(str[i])) {
      str[i] = reversedAlpha[idxRA++];
    }
  }
  return str.join("");
}

function reverseOnlyAlphabetical2(str) {
  const result = str.split("");
  let left = 0;
  let right = result.length - 1;
  while (left < right) {
    if (!isAlpha(result[left].charCodeAt())) {
      left++;
    } else if (!isAlpha(result[right].charCodeAt())) {
      right--;
    } else {
      let temp = result[left];
      result[left] = result[right];
      result[right] = temp;
      left++;
      right--;
    }
  }
  return result.join("");
}

function reverseOnlyAlphabetical3(str) {
  let alphaOnly = str.split("").filter((c) => /[a-z]/gi.test(c));

  return str
    .split("")
    .map((c) => {
      if (/[^a-z]/gi.test(c)) {
        return c;
      }

      let next = alphaOnly[alphaOnly.length - 1];
      alphaOnly.splice(alphaOnly.length - 1, 1);
      return next;
    })
    .join("");
}

function isAlpha(c) {
  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
}

function reverse(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    start++;
    end--;
  }
  return arr;
}
