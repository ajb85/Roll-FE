export default game => {
  const { scores } = game;
  const players = game.players.length;
  if (!scores.length) {
    return players;
  }
  if (scores.length !== players) {
    return players - scores.length;
  }

  let count = 0;
  scores.forEach(userScore => {
    let userRound = 0;
    for (let category in userScore) {
      if (userScore[category] && isPlayableCategory(category)) {
        userRound += 1;
      }
    }
    if (userRound === game.round) {
      count += 1;
    }
  });
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
