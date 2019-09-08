export default (category, dice, userScore) => {
  if (!category || !dice) {
    return userScore;
  }
  const score = { ...userScore };
  score[category] = {
    Ones: () => single(1, dice),
    Twos: () => single(2, dice),
    Threes: () => single(3, dice),
    Fours: () => single(4, dice),
    Fives: () => single(5, dice),
    Sixes: () => single(6, dice),
    '3 of a Kind': () => multiple(3, dice),
    '4 of a Kind': () => multiple(4, dice),
    'Roll!': () => multiple(5, dice),
    'Full House': () => multiple([2, 3], dice),
    'Sm Straight': () => inARow(4, dice),
    'Lg Straight': () => inARow(5, dice),
    'Free Space': () => freeSpace(dice)
  }[category]();

  calcLeft(score);
  calcRight(category, dice, score);

  return score;
};

function single(num, dice) {
  return dice.filter(d => parseInt(d, 10) === parseInt(num, 10)).length * num;
}

function multiple(num, dice) {
  const count = [0, 0, 0, 0, 0, 0];

  dice.forEach(d => {
    count[d - 1] += 1;
  });

  if (Array.isArray(num)) {
    // Full House
    return count.sort()[count.length - 1] === 3 && count[count.length - 2] === 2
      ? 25
      : 0;
  } else
    return count.reduce(
      (acc, cur, i) => (cur >= num ? (num === 5 ? 50 : cur * (i + 1)) : acc),
      0
    );
}

function inARow(num, dice) {
  const score = { 4: 30, 5: 40 };
  const copy = [...dice].sort();
  const end = copy.length;

  let count = 0;
  for (let i = 0; i < end - 1; i++) {
    if (count + end - i < num) {
      // Bail early if remaining indices can't fulfill 'num'
      return 0;
    } else if (count >= num) {
      // Bail early if num is reached
      return score[num];
    }
    count = copy[i] + 1 === copy[i + 1] ? (count === 0 ? 2 : ++count) : count;
  }
  return count >= num ? score[num] : 0;
}

function freeSpace(dice) {
  return dice.reduce((acc, cur) => acc + cur);
}

function calcLeft(score) {
  const left = {
    Ones: true,
    Twos: true,
    Threes: true,
    Fours: true,
    Fives: true,
    Sixes: true
  };

  let bonus = 0;

  for (let c in left) {
    bonus += score[c] ? score[c] : 0;
  }
  let total = bonus;

  bonus = bonus > 63 ? 35 : 0;
  total += bonus;

  score['Left Bonus'] = bonus;
  score['Left Total'] = total;
}

function calcRight(category, dice, score) {
  if (isRoll(dice) && score['Roll!'] && category !== 'Roll!') {
    score['Roll! Bonus'] = score['Roll! Bonus']
      ? score['Roll! Bonus'] + 50
      : 50;
  }
  const right = {
    '3 of a Kind': true,
    '4 of a Kind': true,
    'Full House': true,
    'Sm Straight': true,
    'Lg Straight': true,
    'Roll!': true,
    'Roll! Bonus': true,
    'Free Space': true
  };

  let total = 0;

  for (let c in right) {
    total += score[c] ? score[c] : 0;
  }
  score['Grand Total'] = (score['Left Total'] || 0) + total;
}

function isRoll(dice) {
  return dice.length === dice.filter(d => d === dice[0]).length;
}
