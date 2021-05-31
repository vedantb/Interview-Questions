function zSubstringSearch(text, pattern) {
  let newString = `${pattern}$${text}`.split("");

  let result = [];
  let z = calculateZ(newString);

  for (let i = 0; i < z.length; i++) {
    if (z[i] === pattern.length) {
      result.push(i - pattern.length - 1);
    }
  }
  return result;
}

function calculateZ(input) {
  let z = Array(input.length).fill(0);
  let left = 0;
  let right = 0;
  for (let k = 1; k < input.length; k++) {
    if (k > right) {
      left = k;
      right = k;
      while (right < input.length && input[right] === input[right - left]) {
        right++;
      }
      z[k] = right - left;
      right--;
    } else {
      let k1 = k - left;
      if (z[k1] < right - k + 1) {
        z[k] = z[k1];
      } else {
        left = k;
        while (right < input.length && input[right] === input[right - left]) {
          right++;
        }
        z[k] = right - left;
        right--;
      }
    }
  }
  return z;
}

console.log(zSubstringSearch("abcxabcdabcdabcy", "abcdabcy"));
console.log(zSubstringSearch("vedantbhatt", "that"));
