export function getGameRound(scores, user_id) {
  let userRound, lowCount;

  for (let userID in scores) {
    const s = scores[userID];
    let count = 0;
    const { score: userScore } = s;

    for (let category in userScore) {
      if (userScore[category] !== null && isPlayableCategory(category)) {
        count++;
      }
    }

    if (user_id && s.user_id === user_id) {
      userRound = count;
    }

    lowCount = lowCount === undefined || count < lowCount ? count : lowCount;
  }

  lowCount = lowCount || 0;
  userRound = userRound || 0;
  return user_id ? userRound <= lowCount : lowCount;
}

export function isUsersTurn(scores, user_id) {
  return getGameRound(scores, user_id);
}

export function getUsersOnRound(game) {
  const { scores } = game;

  const rounds = [];
  for (let player in scores) {
    const { score } = scores[player];
    let userRound = 0;
    for (let category in score) {
      if (score[category] && isPlayableCategory(category)) {
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
}

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
