export default function camelToDisplayCase(str) {
  return str.split("").reduce((acc, letter, i) => {
    if (i === 0) {
      acc += letter.toUpperCase();
    } else if (isCapitalLetter(letter)) {
      acc += " " + letter;
    } else {
      acc += letter;
    }
    return acc;
  }, "");
}

function isCapitalLetter(char) {
  return char !== char.toLowerCase() && char === char.toUpperCase();
}
