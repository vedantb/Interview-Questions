var lengthOfLongestSubstring = function (s) {
  let res = 0;
  let map = {};
  let n = s.length;
  let left = 0;
  for (let right = 0; right < n; right++) {
    if (s[right] in map) {
      left = Math.max(map[s[right]], left);
    }
    res = Math.max(res, right - left + 1);
    map[s[right]] = right + 1;
  }
  return res;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
