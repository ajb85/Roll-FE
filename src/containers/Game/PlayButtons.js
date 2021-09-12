import React from "react";

import LoadingDice from "components/LoadingDice";
import Die from "components/Die/";

import { useGames } from "hooks/";

import { combineClasses, noFunc } from "js/utility";
import styles from "./Game.module.scss";

function PlayButtons({ game, endRound, lockedDice, selectedCategory, isLoading }) {
  const { rollTheDice } = useGames();
  const { isUsersTurn, rolls, game_id } = game;
  const turns = rolls ? 3 - rolls.length : 3;

  const rtdDice = [];
  for (let i = 1; i <= turns; i++) {
    rtdDice.push(i);
  }

  const rtdDisabled = !isUsersTurn || turns === 0;
  return (
    <section className={styles.buttons}>
      {true ? (
        <button className={combineClasses(styles.primaryButton, styles.disabled)} type="button">
          <LoadingDice fontSize="1.5rem" dice={[1, 2, 3, 4, 5]} />
        </button>
      ) : (
        <button
          className={combineClasses(styles.primaryButton, rtdDisabled ? styles.disabled : "")}
          disabled={rtdDisabled}
          type="button"
          onClick={() => rollTheDice(game_id, lockedDice)}
        >
          <p>{turns > 0 ? "RTD!" : "Done!"}</p>
          {rtdDice.map((d, i) => (
            <Die style={{ animationDuration: "1.5s" }} key={`${d} at ${i}`} face={d} size="small" />
          ))}
        </button>
      )}
      <button
        className={!selectedCategory || !isUsersTurn ? styles.disabled : ""}
        onClick={!selectedCategory || !isUsersTurn ? noFunc : endRound}
      >
        Submit
      </button>
    </section>
  );
}

export default PlayButtons;
