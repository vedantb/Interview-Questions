/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  let dp = Array(s.length + 1).fill(false);
  let set = new Set(wordDict);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      const word = s.slice(j, i);
      if (dp[j] === true && set.has(word)) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
};

let wordBreakTopDown = function (s, wordDict) {
  return wordBreakHelper(s, new Set(wordDict), 0, Array(s.length).fill(false));
};

let wordBreakHelper = function (s, wordDict, start, memo) {
  if (start === s.length) return true;

  if (memo[start]) return memo[start];

  for (let end = start + 1; end <= s.length; end++) {
    if (wordDict.has(s.substr(start, end)) && wordBreakHelper(s, wordDict, end, memo)) {
      memo[start] = true;
      return true;
    }
  }
  memo[start] = false;
  return false;
};

let wordBreakBottomUp = function (s, wordDict) {
  let wordDictSet = new Set(wordDict);
  let dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      if (dp[start] && wordDictSet.has(s.substr(start, end))) {
        dp[end] = true;
        break;
      }
    }
  }
  return dp[s.length];
};

console.log(wordBreakTopDown("leetcode", ["leet", "codes"]));
