import { useCallback } from "react";

import LoadingDice from "components/LoadingDice";
import Die from "components/Die/";

import { useGames, useViewingPlayer } from "hooks/";

import { combineClasses, noFunc } from "js/utility";
import styles from "./Game.module.scss";

function PlayButtons({ game, endRound, lockedDice, selectedCategory, isLoading }) {
  const { rollTheDice } = useGames();
  const { setViewSelf } = useViewingPlayer();
  const { isUsersTurn, rolls, game_id } = game;
  const turns = rolls ? 3 - rolls.length : 3;

  const rtd = useCallback(() => {
    rollTheDice(game_id, lockedDice);
    setViewSelf();
  }, [rollTheDice, setViewSelf, game_id, lockedDice]);

  const rtdDice = [];
  for (let i = 1; i <= turns; i++) {
    rtdDice.push(i);
  }

  const rtdDisabled = !isUsersTurn || turns === 0;
  return (
    <section className={styles.buttons}>
      {isLoading ? (
        <button className={combineClasses(styles.primaryButton, styles.disabled)} type="button">
          <LoadingDice fontSize="1.5rem" dice={[1, 2, 3, 4, 5]} />
        </button>
      ) : (
        <button
          className={combineClasses(styles.primaryButton, rtdDisabled ? styles.disabled : "")}
          disabled={rtdDisabled}
          type="button"
          onClick={rtd}
        >
          <p>{turns > 0 ? "RTD!" : "Done!"}</p>
          {rtdDice.map((d, i) => (
            <Die className={styles.rtdDie} key={`${d} at ${i}`} face={d} size="small" />
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
