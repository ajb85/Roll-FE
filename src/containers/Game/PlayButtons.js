import React from "react";

import LoadingDice from "components/LoadingDice";
import Die from "components/Die/";

import { useGames } from "hooks/";

import submitImage from "img/submit.png";
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
      {isLoading ? (
        <button style={{ width: "50%" }} type="button">
          <LoadingDice fontSize="1.5rem" dice={[1, 2, 3, 4, 5]} />
        </button>
      ) : (
        <button
          disabled={rtdDisabled}
          type="button"
          style={{ width: "50%" }}
          className={rtdDisabled ? styles.disabled : ""}
          onClick={() => rollTheDice(game_id, lockedDice)}
        >
          <p>{turns > 0 ? "RTD!" : "Done!"}</p>
          {rtdDice.map((d, i) => (
            <Die style={{ animationDuration: "1.5s" }} key={`${d} at ${i}`} face={d} size="small" />
          ))}
        </button>
      )}
      <img
        onClick={endRound}
        src={submitImage}
        alt="Submit Turn"
        style={{ opacity: selectedCategory && isUsersTurn ? 1 : 0.5 }}
      />
    </section>
  );
}

export default PlayButtons;
