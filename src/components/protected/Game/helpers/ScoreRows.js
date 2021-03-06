import React from "react";

import { leftCategories, rightCategories } from "js/categories.js";
import useColorMode from "hooks/useColorMode.js";

import styles from "../styles.module.scss";

function ScoreRow({
  localState,
  rawUserScore,
  toggleSelected,
  userScore,
  isViewingSelf,
}) {
  const { colors } = useColorMode();
  const { isTurn, game, selected } = localState;

  return (
    <>
      {leftCategories.map((l, i) => {
        const r = rightCategories[i];
        const lClickable =
          isViewingSelf &&
          isTurn &&
          l.isClickable &&
          game.rolls &&
          game.rolls.length &&
          rawUserScore[l.name] === null;

        const rClickable =
          isViewingSelf &&
          isTurn &&
          r.isClickable &&
          game.rolls &&
          game.rolls.length &&
          rawUserScore[r.name] === null;

        const leftBG = lClickable
          ? selected === l.name
            ? colors.brightAccent
            : rawUserScore[l.name]
            ? colors.primary
            : colors.accent
          : colors.primary;

        const rightBG = rClickable
          ? selected === r.name
            ? colors.brightAccent
            : rawUserScore[r.name]
            ? colors.primary
            : colors.accent
          : colors.primary;

        return (
          <div className={styles.row} key={`${l.name} ${r.name}`}>
            <p>{l.name}</p>
            <p
              id={l.name}
              onClick={(e) => (lClickable ? toggleSelected(e) : null)}
              style={{
                backgroundColor: leftBG,
                color: selected === l.name ? "black" : colors.secondary,
              }}
            >
              {userScore[l.name]}
            </p>
            <p>{r.name}</p>
            <p
              id={r.name}
              onClick={(e) => (rClickable ? toggleSelected(e) : null)}
              style={{
                backgroundColor: rightBG,
                color: selected === r.name ? "black" : colors.secondary,
              }}
            >
              {userScore[r.name]}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default ScoreRow;
