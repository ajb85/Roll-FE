import React from "react";

import Die from "components/Die/";

import styles from "./Game.module.scss";

function Dice({ game, lockedDice, toggleLockOnDie }) {
  const { isUsersTurn, rolls } = game || {};
  const dice = rolls?.length ? rolls[rolls.length - 1] : [];
  const hasDiceRolls = dice?.length;

  return (
    <section className={styles.dice}>
      {hasDiceRolls ? (
        dice.map((dieFace, i) => {
          const isLocked = lockedDice[i];
          return (
            <Die
              index={i}
              style={{ opacity: isLocked ? 0.5 : 1 }}
              key={i}
              onClick={toggleLockOnDie}
              face={dieFace}
            />
          );
        })
      ) : (
        <RollDice isUsersTurn={isUsersTurn} />
      )}
    </section>
  );
}

function RollDice({ isUsersTurn }) {
  return (
    <>
      <Die style={{ opacity: isUsersTurn ? 1 : 0.5 }} face="r" />
      <Die style={{ opacity: isUsersTurn ? 1 : 0.5 }} face="o" />
      <Die style={{ opacity: isUsersTurn ? 1 : 0.5 }} face="l" />
      <Die style={{ opacity: isUsersTurn ? 1 : 0.5 }} face="l" />
      <Die style={{ opacity: isUsersTurn ? 1 : 0.5 }} face="!" />
    </>
  );
}

export default Dice;
