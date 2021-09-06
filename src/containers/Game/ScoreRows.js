import React from "react";

import { leftCategories, rightCategories } from "js/categories.js";
import { useColorMode } from "hooks/";
import { noFunc } from "js/utility";

import styles from "./Game.module.scss";

function ScoreRow(props) {
  const { rawUserScore, userScore, isViewingSelf, game, toggleCategory, selectedCategory } = props;
  const { isUsersTurn, rolls } = game;
  const { colors } = useColorMode();

  return (
    <>
      {leftCategories.map((l, i) => {
        const r = rightCategories[i];
        const lClickable =
          isViewingSelf &&
          isUsersTurn &&
          l.isClickable &&
          rolls?.length &&
          rawUserScore[l.name] === null;

        const rClickable =
          isViewingSelf &&
          isUsersTurn &&
          r.isClickable &&
          rolls?.length &&
          rawUserScore[r.name] === null;

        const leftBG = lClickable
          ? selectedCategory === l.name
            ? colors.brightAccent
            : rawUserScore[l.name]
            ? colors.primary
            : colors.accent
          : colors.primary;

        const rightBG = rClickable
          ? selectedCategory === r.name
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
              onClick={lClickable ? toggleCategory : noFunc}
              style={{
                backgroundColor: leftBG,
                color: selectedCategory === l.name ? "black" : colors.secondary,
                cursor: lClickable ? "pointer" : "initial",
              }}
            >
              {userScore[l.name]}
            </p>
            <p>{r.name}</p>
            <p
              id={r.name}
              onClick={rClickable ? toggleCategory : noFunc}
              style={{
                backgroundColor: rightBG,
                color: selectedCategory === r.name ? "black" : colors.secondary,
                cursor: rClickable ? "pointer" : "initial",
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
