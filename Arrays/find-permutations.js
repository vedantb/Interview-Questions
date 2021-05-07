function findPermutations(nums) {
  let numsLength = nums.length;
  let result = [];
  let permutations = []; // [[3,1], [1,3]]
  permutations.push([]);
  for (let i = 0; i < nums.length; i++) {
    const currentNumber = nums[i];
    // we will take all existing permutations and add the current number to create new permutations
    let n = permutations.length;
    for (let p = 0; p < n; p++) {
      const oldPermutation = permutations.shift(); // [1]
      for (let j = 0; j < oldPermutation.length + 1; j++) {
        const newPermutation = oldPermutation.slice(0); // clone the permutation [1]
        newPermutation.splice(j, 0, currentNumber); // insert currentNumber at index 'j' [1,3]
        if (newPermutation.length === numsLength) {
          result.push(newPermutation);
        } else {
          permutations.push(newPermutation);
        }
      }
    }
  }
  return result;
}
