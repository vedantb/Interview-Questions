function reverseWordsInString(string) {
  const words = [];
  let startOfWord = 0;
  for (let idx = 0; idx < string.length; idx++) {
    const character = string[idx];
    if (character === " ") {
      words.push(string.slice(startOfWord, idx));
      startOfWord = idx;
    } else if (string[startOfWord] === " ") {
      words.push(" ");
      startOfWord = idx;
    }
  }
  words.push(string.slice(startOfWord));

  reverseList(words);
  return words.join("");
}

function reverseList(list, start = 0, end = list.length - 1) {
  while (start < end) {
    const temp = list[start];
    list[start] = list[end];
    list[end] = temp;
    start++;
    end--;
  }
}

function reverseWordsInString2(string) {
  const characters = [];
  for (let char of string) {
    characters.push(char);
  }
  reverseList(characters);
  let startOfWord = 0;
  while (startOfWord < characters.length) {
    let endOfWord = startOfWord;
    while (endOfWord < characters.length && characters[endOfWord] !== " ") {
      endOfWord++;
    }
    reverseList(characters, startOfWord, endOfWord);
    startOfWord = endOfWord + 1;
  }
  return characters.join(" ");
}
