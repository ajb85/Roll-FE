import React from "react";

// Roll! dice
import rDie from "img/R.png";
import oDie from "img/O.png";
import lDie from "img/L.png";
import exclaimDie from "img/e.png";

// Numbered dice
import oneDie from "img/1.png";
import twoDie from "img/2.png";
import threeDie from "img/3.png";
import fourDie from "img/4.png";
import fiveDie from "img/5.png";
import sixDie from "img/6.png";

// Numbered dice (locked)
import oneDieLocked from "img/1l.png";
import twoDieLocked from "img/2l.png";
import threeDieLocked from "img/3l.png";
import fourDieLocked from "img/4l.png";
import fiveDieLocked from "img/5l.png";
import sixDieLocked from "img/6l.png";

import styles from "../styles.module.scss";

const diceImages = [null, oneDie, twoDie, threeDie, fourDie, fiveDie, sixDie];
const diceImagesLocked = [
  null,
  oneDieLocked,
  twoDieLocked,
  threeDieLocked,
  fourDieLocked,
  fiveDieLocked,
  sixDieLocked,
];

function Dice({ localState, toggleLockOnDie }) {
  const { isTurn, locked, game } = localState;
  const dice =
    game && game.rolls && game.rolls.length
      ? game.rolls[game.rolls.length - 1]
      : [];
  const hasDiceRolls = dice && dice.length;

  return (
    <section className={styles.dice}>
      {hasDiceRolls ? (
        dice.map((dieFace, i) => {
          const isLocked = locked[i];
          const dieImage = isLocked
            ? diceImagesLocked[dieFace]
            : diceImages[dieFace];
          return (
            <img
              key={i}
              onClick={toggleLockOnDie.bind(this, i)}
              src={dieImage}
              alt={`${dieFace} die`}
            />
          );
        })
      ) : (
        <RollDice isTurn={isTurn} />
      )}
    </section>
  );
}

function RollDice({ isTurn }) {
  return (
    <>
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={rDie}
        key={"R"}
        alt="R die"
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={oDie}
        key={"O"}
        alt="O die"
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={lDie}
        key={"L1"}
        alt="L die"
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={lDie}
        key={"L2"}
        alt="L die"
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={exclaimDie}
        key={"!"}
        alt="! die"
      />
    </>
  );
}

export default Dice;
