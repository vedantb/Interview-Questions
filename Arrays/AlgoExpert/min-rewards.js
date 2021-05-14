function minRewards(scores) {
  let rewards = Array(scores.length).fill(1);

  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[i - 1]) {
      rewards[i] = Math.max(rewards[i], rewards[i - 1] + 1);
    }
  }

  for (let j = scores.length - 2; j >= 0; j--) {
    if (scores[j] > scores[j + 1]) {
      rewards[j] = Math.max(rewards[j], rewards[j + 1] + 1);
    }
  }

  return rewards.reduce((a, b) => a + b);
}

console.log(minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5]));
