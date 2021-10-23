export const leftCategories = [
  { name: "Ones", isClickable: true, achieved: 'Any "1" Dice', score: 'Sum of all "1" dice' },
  { name: "Twos", isClickable: true, achieved: 'Any "2" Dice', score: 'Sum of all "2" dice' },
  { name: "Threes", isClickable: true, achieved: 'Any "3" Dice', score: 'Sum of all "3" dice' },
  { name: "Fours", isClickable: true, achieved: 'Any "4" Dice', score: 'Sum of all "4" dice' },
  { name: "Fives", isClickable: true, achieved: 'Any "5" Dice', score: 'Sum of all "5" dice' },
  { name: "Sixes", isClickable: true, achieved: 'Any "6" Dice', score: 'Sum of all "6" dice' },
  {
    name: "Left Bonus",
    isClickable: false,
    achieved: "Left Total >= 63",
    score: "35",
  },
  { name: "Left Total", isClickable: false },
];

export const rightCategories = [
  { name: "3 of a Kind", isClickable: true, achieved: "3 of any die", score: "Sum of all dice" },
  { name: "4 of a Kind", isClickable: true, achieved: "4 of any die", score: "Sum of all dice" },
  { name: "Full House", isClickable: true, achieved: "3 of any die, 2 of another", score: "25" },
  {
    name: "Sm Straight",
    isClickable: true,
    achieved: "Sequence of 4 consecutive dice",
    score: "30",
  },
  {
    name: "Lg Straight",
    isClickable: true,
    achieved: "Sequence of 5 consecutive dice",
    score: "40",
  },
  { name: "Roll!", isClickable: true, achieved: "5 of any die", score: "50" },
  {
    name: "Roll! Bonus",
    isClickable: false,
    achieved: "Any 5 of a kind in a scoring category after Roll! has been achieved",
    score: "+50 per qualifying category",
  },
  { name: "Free Space", achieved: "No conditions", score: "Sum of all dice", isClickable: true },
];
