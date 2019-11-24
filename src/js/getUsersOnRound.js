export default game => {
  const { scores } = game;

  const rounds = [];
  for (let player in scores) {
    const { score } = scores[player];
    let userRound = 0;
    for (let category in score) {
      if (userScore[category] && isPlayableCategory(category)) {
        userRound += 1;
      }
    }
    rounds.push(userRound);
  }

  rounds.sort((a, b) => b - a);
  const r = rounds[rounds.length - 1];
  let count = 0;

  while (rounds.length && rounds[rounds.length - 1] === r) {
    count++;
    rounds.pop();
  }

  return count;
};

function isPlayableCategory(category) {
  return {
    Ones: true,
    Twos: true,
    Threes: true,
    Fours: true,
    Fives: true,
    Sixes: true,
    '3 of a Kind': true,
    '4 of a Kind': true,
    'Full House': true,
    'Sm Straight': true,
    'Lg Straight': true,
    'Roll!': true,
    'Free Space': true
  }.hasOwnProperty(category);
}
