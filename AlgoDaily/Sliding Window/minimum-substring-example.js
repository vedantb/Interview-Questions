function minWindow(str, reqChars) {
  // hash to keep account of how many required chars we've checked off
  // each key will represent a character in reqChars
  // we preset each to 1 and will look to lower it to 0 when it is filled
  let hash = {};

  for (let c of reqChars) {
    hash[c] = 1;
  }

  // trackers we need
  // this is a coutner to measure string length against
  let counter = reqChars.length;
  let begin = 0;
  let end = 0;
  let subStrSize = str.length + 1;
  let head = 0;

  while (end < str.length) {
    // continue running till there's more elements in str to process
    if (str[end] in hash) {
      // we found a letter we need to fulfill

      // modify the length counter, we can use this as part of our substring
      if (hash[str[end]] > 0) {
        counter -= 1;
      }

      // modify the dictionary to say we've gotten this characters requirement
      hash[str[end]] -= 1;
    }

    // from here we increase begin pointer to make it invalid/valid again
    while (counter === 0) {
      // calculate the current substring size since we care about min
      if (end - begin + 1 < subStrSize) {
        subStrSize = end - begin + 1;
        head = begin;
      }

      // we want to shrink from the beginning now
      // to make it the minimum size possible
      if (str[begin] in hash) {
        hash[str[begin]] += 1;

        if (hash[str[begin]] > 0) {
          counter += 1;
        }
      }

      begin += 1;
    }

    end += 1;
  }

  return subStrSize > str.length ? "" : str.substr(head, subStrSize);
}

console.log(minWindow("abcalgosomedailyr", "ad"));
