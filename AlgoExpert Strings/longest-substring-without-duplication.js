function longestSubstringWithoutDuplication(string) {
    const lastSeen = {};
    let startIdx = 0;
    let longest = [0,1];
    for(let idx = 0; idx < string.length; idx++) {
        let char = string[idx];
        if(char in lastSeen) {
            startIdx = Math.max(startIdx, lastSeen[char] + 1);
        }
        if (longest[1] - longest[0] < idx + 1 - startIdx) {
            longest = [startIdx, idx + 1];
        }
        lastSeen[char] = idx;
    }
    return string.slice(longest[0], longest[1]);
}