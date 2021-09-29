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
        dice.map((dieFace, i) => (
          <Die locked={lockedDice[i]} index={i} key={i} onClick={toggleLockOnDie} face={dieFace} />
        ))
      ) : (
        <RollDice isUsersTurn={isUsersTurn} />
      )}
    </section>
  );
}

function RollDice({ isUsersTurn }) {
  return (
    <>
      <Die face="r" />
      <Die face="o" />
      <Die face="l" />
      <Die face="l" />
      <Die face="!" />
    </>
  );
}

export default Dice;
