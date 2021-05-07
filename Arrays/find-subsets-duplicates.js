function findSubsets(nums) {
  // sort the numbers to handle dups
  nums.sort((a, b) => a - b);
  const subsets = [];
  subsets.push([]);
  let startIndex = 0;
  let endIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    startIndex = 0;
    // if current and the previous elements are same, create new subsets only from the subsets add in prev step
    if (i > 0 && nums[i] === nums[i - 1]) {
      startIndex = endIndex + 1;
    }
    endIndex = subsets.length - 1;

    for (let j = startIndex; j < endIndex + 1; j++) {
      const set1 = subsets[j].slice(0);
      set1.push(nums[i]);
      subsets.push(set1);
    }
    console.log(subsets);
  }
  return subsets;
}

console.log("Here is the list of subsets: ");
let result = findSubsets([1, 3, 3]);
result.forEach((subset) => {
  console.log(subset);
});

console.log("Here is the list of subsets: ");
result = findSubsets([1, 5, 3, 3]);
result.forEach((subset) => {
  console.log(subset);
});
