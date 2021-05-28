const find_word_concatenation = function (str, words) {
  let resultIndices = [];
  let wordsCount = words.length;
  let wordLength = words[0].length;
  let wordsFrequency = {};

  for (let word of words) {
    if (!(word in wordsFrequency)) {
      wordsFrequency[word] = 0;
    }
    wordsFrequency[word] += 1;
  }

  for (let i = 0; i < str.length - wordsCount * wordLength + 1; i++) {
    const wordsSeen = {};
    for (let j = 0; j < wordsCount; j++) {
      let nextWordIndex = i + j * wordLength;
      // Get the next word from the string
      let word = str.substring(nextWordIndex, nextWordIndex + wordLength);
      if (!(word in wordsFrequency)) {
        break;
      }

      if (!(word in wordsSeen)) {
        wordsSeen[word] = 0;
      }
      wordsSeen[word] += 1;

      // no need to process further if word has higer frequency than required
      if (wordsSeen[word] > (wordsFrequency[word] || 0)) {
        break;
      }

      if (j + 1 === wordsCount) {
        resultIndices.push(i);
      }
    }
  }
  return resultIndices;
};

console.log(find_word_concatenation("catfoxcat", ["cat", "fox"]));
console.log(find_word_concatenation("catcatfoxfox", ["cat", "fox"]));
