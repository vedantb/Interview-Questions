class AbbreviatedWord {
  constructor(str, start, count) {
    this.str = str;
    this.start = start;
    this.count = count;
  }
}

let generateGeneralizedAbbr = function (word) {
  let wordLen = word.length;
  let result = [];
  const queue = [];
  queue.push(new AbbreviatedWord("", 0, 0));
  while (queue.length > 0) {
    const abWord = queue.shift();
    if (abWord.start === wordLen) {
      if (abWord.count !== 0) {
        abWord.str += abWord.count;
      }
      result.push(abWord.str);
    } else {
      queue.push(new AbbreviatedWord(abWord.str, abWord.start + 1, abWord.count + 1));

      if (abWord.count !== 0) {
        abWord.str += abWord.count;
      }
      let newWord = abWord.str + word[abWord.start];
      queue.push(new AbbreviatedWord(newWord, abWord.start + 1, 0));
    }
  }
  return result;
};
