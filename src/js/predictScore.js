const categoryScoring = {
  Ones: (dice) => single(1, dice),
  Twos: (dice) => single(2, dice),
  Threes: (dice) => single(3, dice),
  Fours: (dice) => single(4, dice),
  Fives: (dice) => single(5, dice),
  Sixes: (dice) => single(6, dice),
  "3 of a Kind": (dice) => multiple(3, dice),
  "4 of a Kind": (dice) => multiple(4, dice),
  "Roll!": (dice) => multiple(5, dice),
  "Full House": fullHouse,
  "Sm Straight": (dice) => inARow(4, dice),
  "Lg Straight": (dice) => inARow(5, dice),
  "Free Space": freeSpace,
};

export default function predictScore(category, dice, userScore) {
  if (!category || !dice) {
    return userScore;
  }

  const score = { ...userScore };
  score[category] = categoryScoring[category](dice);
  calcLeft(score);
  calcRight(category, dice, score);

  return score;
}

function single(num, dice) {
  return dice.filter((d) => parseInt(d, 10) === parseInt(num, 10)).length * num;
}

function multiple(num, dice) {
  const count = getSortedNumberOfEachDice(dice);
  return count[0] >= num ? (num === 5 ? 50 : freeSpace(dice)) : 0;
}

function fullHouse(dice) {
  const count = getSortedNumberOfEachDice(dice);
  return count[0] === 3 && count[1] === 2 ? 25 : 0;
}

function getSortedNumberOfEachDice(dice) {
  const count = new Array(6).fill(0);

  dice.forEach((d) => {
    count[d - 1] += 1;
  });

  count.sort(sortGreatestToLeast);
  return count;
}

const inARowScore = { 4: 30, 5: 40 };
const countValue = { 0: 2, 2: 3, 3: 4, 4: 5 };
function inARow(num, dice) {
  const copy = [...new Set(dice)].sort();
  const end = copy.length;

  let count = 0;
  for (let i = 0; i < end - 1; i++) {
    if (count + end - i < num) {
      // Bail early if remaining indices can't fulfill 'num'
      return 0;
    } else if (count >= num) {
      // Bail early if num is reached
      return inARowScore[num];
    }
    count = copy[i] + 1 === copy[i + 1] ? countValue[count] : 0;
  }

  return count >= num ? inARowScore[num] : 0;
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
    Sixes: true,
  };

  let bonus = 0;

  for (let c in left) {
    bonus += score[c] ? score[c] : 0;
  }
  let total = bonus;

  bonus = bonus >= 63 ? 35 : 0;
  total += bonus;

  score["Left Bonus"] = bonus;
  score["Left Total"] = total;
}

function calcRight(category, dice, score) {
  if (isRoll(dice) && score["Roll!"] && category !== "Roll!") {
    score["Roll! Bonus"] = score["Roll! Bonus"] ? score["Roll! Bonus"] + 50 : 50;
  }
  const right = {
    "3 of a Kind": true,
    "4 of a Kind": true,
    "Full House": true,
    "Sm Straight": true,
    "Lg Straight": true,
    "Roll!": true,
    "Roll! Bonus": true,
    "Free Space": true,
  };

  let total = 0;

  for (let c in right) {
    total += score[c] ? score[c] : 0;
  }
  score["Grand Total"] = (score["Left Total"] || 0) + total;
}

function isRoll(dice) {
  return dice.length === dice.filter((d) => d === dice[0]).length;
}

function sortGreatestToLeast(a, b) {
  return b - a;
}
