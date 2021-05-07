// Given a set with distinct elements, find all of its distinct subsets.

function findSubsets(nums) {
  const subsets = [];

  // start by adding an empty subset
  subsets.push([]);

  for (let i = 0; i < nums.length; i++) {
    let currentNumber = nums[i];
    // we will take all existing subsets and insert the current number in them to create new subsets
    const n = subsets.length;
    for (let j = 0; j < n; j++) {
      // create a new subset from the existing subset and insert the current element to it
      const set1 = subsets[j].slice(0);
      set1.push(currentNumber);
      subsets.push(set1);
    }
  }
  return subsets;
}

console.log("Here is the list of subsets: ");
let result = findSubsets([1, 3]);
result.forEach((subset) => {
  console.log(subset);
});

console.log("Here is the list of subsets: ");
result = findSubsets([1, 5, 3]);
result.forEach((subset) => {
  console.log(subset);
});

// Since, in each step, the number of subsets doubles as we add each element to all the existing subsets,
// therefore, we will have a total of O(2^N) subsets, where ‘N’ is the total number of elements in the input set.

// And since we construct a new subset from an existing set, therefore, the time complexity of the above algorithm will be O(N*2^N)
