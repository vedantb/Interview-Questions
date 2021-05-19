/**
 * Write a function that takes an array of strings and groups the anagrams together.
 * e.g. ['yo', 'act', 'flop', 'tac', 'foo', 'cat', 'oy', 'olfp']
 * results in [['yo', 'oy'], ['flop', 'olfp'], ['act', 'tac', 'cat'], ['foo']]
 * @param {String} words
 * @returns {Array}
 */
function groupAnagrams(words) {
  const anagrams = {};
  for (const word of words) {
    let sortedWord = word.split("").sort().join("");
    if (sortedWord in anagrams) {
      anagrams[sortedWord].push(word);
    } else {
      anagrams[sortedWord] = [word];
    }
  }
  return Object.values(anagrams);
}
