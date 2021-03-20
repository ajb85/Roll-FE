import React from "react";
import { useDispatch } from "react-redux";

import LoadingDice from "components/UI/LoadingDice/";
import Die from "components/Die/";

import { rollTheDice } from "reducers/games.js";

import submitImage from "img/submit.png";
import styles from "../styles.module.scss";

function PlayButtons({ localState, endRound, isLoading }) {
  const { game, locked, selected, isTurn } = localState;
  const turns =
    localState.game && localState.game.rolls
      ? 3 - localState.game.rolls.length
      : 3;
  const { game_id } = game;
  const dispatch = useDispatch();

  const rtdDice = [];
  for (let i = 1; i <= turns; i++) {
    rtdDice.push(i);
  }

  return (
    <section className={styles.buttons}>
      {isLoading ? (
        <button style={{ width: "50%" }} type="button">
          <LoadingDice fontSize="1.5rem" dice={[1, 2, 3, 4, 5]} />
        </button>
      ) : (
        <button
          disabled={turns === 0}
          type="button"
          style={{ width: "50%" }}
          className={turns === 0 ? "disabled" : ""}
          onClick={() => dispatch(rollTheDice(game_id, locked))}
        >
          <p>{turns > 0 ? "RTD!" : "Done!"}</p>
          {rtdDice.map((d, i) => (
            <Die
              style={{ animationDuration: "1.5s" }}
              key={`${d} at ${i}`}
              face={d}
              size="small"
            />
          ))}
        </button>
      )}
      <img
        onClick={endRound}
        src={submitImage}
        alt={`Submit turn`}
        style={{ opacity: selected && isTurn ? 1 : 0.5 }}
      />
    </section>
  );
}

export default PlayButtons;
