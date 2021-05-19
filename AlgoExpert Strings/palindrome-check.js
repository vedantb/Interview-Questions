function isPalindrome(string) {
  let start = 0;
	let end = string.length - 1;
	let isPalindrome = true;
	while(start < end) {
		if (string[start] !== string[end]) return false;
		start++;
		end--
	}
	return true;
}