import React from "react";
import { useDispatch } from "react-redux";

import LoadingDice from "components/UI/LoadingDice/";

import { rollTheDice } from "reducers/games.js";

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
  const convert = { 1: "one", 2: "two", 3: "three" };
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
          type="button"
          style={{ width: "50%" }}
          onClick={() => dispatch(rollTheDice(game_id, locked))}
        >
          <p>RTD!</p>
          {rtdDice.map((d, i) => (
            <p
              style={{ animationDuration: "1.5s" }}
              key={`${d} at ${i}`}
            >{`dice-${convert[d]}`}</p>
          ))}
        </button>
      )}
      <img
        onClick={() => {
          endRound();
        }}
        src={require("../../../../img/submit.png")}
        alt={`Submit turn`}
        style={{ opacity: selected && isTurn ? 1 : 0.5 }}
      />
    </section>
  );
}

export default PlayButtons;
