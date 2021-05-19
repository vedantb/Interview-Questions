function minimumCharactersForWords(words) {
  const maximumCharacterFrequencies = {};

  for (const word of words) {
    const characterFrequencies = countCharacterFrequencies(word);
    updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
  }

  return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
}

function countCharacterFrequencies(word) {
  const characterFrequencies = {};
  for (const character of word) {
    if (!(character in characterFrequencies)) {
      characterFrequencies[character] = 0;
    }
    characterFrequencies[character]++;
  }
  return characterFrequencies;
}

function updateMaximumFrequencies(frequencies, maximumCharacterFrequencies) {
  for (const character in frequencies) {
    const frequency = frequencies[character];
    if (character in maximumCharacterFrequencies) {
      maximumCharacterFrequencies[character] = Math.max(frequency, maximumCharacterFrequencies[character]);
    } else {
      maximumCharacterFrequencies[character] = frequency;
    }
  }
}

function makeArrayFromCharacterFrequencies(frequencies) {
  const characters = [];
  for (const character in frequencies) {
    const frequency = frequencies[character];
    for (let idx = 0; idx < frequency; idx++) {
      characters.push(character);
    }
  }
  return characters;
}
