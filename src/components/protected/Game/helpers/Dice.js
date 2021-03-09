import React from "react";

import Die from "components/Die/";

import styles from "../styles.module.scss";

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
          return (
            <Die
              style={{ opacity: isLocked ? 0.5 : 1 }}
              key={i}
              onClick={toggleLockOnDie.bind(this, i)}
              face={dieFace}
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
      <Die
        style={{ opacity: isTurn ? 1 : 0.5 }}
        face="r"
        // key={"R"}
      />
      <Die
        style={{ opacity: isTurn ? 1 : 0.5 }}
        face="o"
        // key={"O"}
      />
      <Die
        style={{ opacity: isTurn ? 1 : 0.5 }}
        face="l"
        // key={"L1"}
      />
      <Die
        style={{ opacity: isTurn ? 1 : 0.5 }}
        face="l"
        // key={"L2"}
      />
      <Die
        style={{ opacity: isTurn ? 1 : 0.5 }}
        face="!"
        // key={"!"}
      />
    </>
  );
}

export default Dice;
