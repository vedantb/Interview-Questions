const chai = require("chai");

function tournamentWinner(competitions, results) {
  let currentBestTeam = "";
  const scores = { [currentBestTeam]: 0 };

  for (let i = 0; i < competitions.length; i++) {
    const result = results[i];
    const [homeTeam, awayTeam] = competitions[i];
    const winningTeam = result === 1 ? homeTeam : awayTeam;

    if (!(winningTeam in scores)) scores[winningTeam] = 0;
    scores[winningTeam] += 3;

    if (scores[winningTeam] > scores[currentBestTeam]) {
      currentBestTeam = winningTeam;
    }
  }
  return currentBestTeam;
}

const competitions = [
  ["HTML", "C#"],
  ["C#", "Python"],
  ["Python", "HTML"]
];
const results = [0, 0, 1];
const expected = "Python";
const actual = tournamentWinner(competitions, results);
chai.expect(actual).to.deep.equal(expected);
