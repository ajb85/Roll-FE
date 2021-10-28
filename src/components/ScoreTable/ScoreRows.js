import React from "react";

import Tooltip from "components/Tooltip";

import { leftCategories, rightCategories } from "js/categories.js";
import { useColorThemes, useViewingPlayer } from "hooks/";
import { noFunc } from "js/utility";

import styles from "./ScoreTable.module.scss";

function ScoreRow(props) {
  const { rawUserScore, userScore, game, toggleCategory, selectedCategory } = props;
  const { isUsersTurn, rolls } = game;
  const { colors } = useColorThemes();
  const { isViewingSelf } = useViewingPlayer();

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

        const leftID = getElementID(l.name);
        const rightID = getElementID(r.name);

        return (
          <div className={styles.row} key={`${l.name} ${r.name}`}>
            <p id={leftID}>{l.name}</p>
            {l.achieved && l.score && (
              <Tooltip target={leftID} className={styles.tooltip}>
                <div className={styles.contentWrapper}>
                  <p>
                    Achieved: <span>{l.achieved}</span>
                  </p>
                  <p>
                    Score: <span>{l.score}</span>
                  </p>
                </div>
              </Tooltip>
            )}
            <p
              data-category={l.name}
              onClick={lClickable ? toggleCategory : noFunc}
              style={{
                backgroundColor: leftBG,
                color: selectedCategory === l.name ? "black" : colors.secondary,
                cursor: lClickable ? "pointer" : "initial",
              }}
            >
              {userScore[l.name]}
            </p>
            <p id={rightID}>{r.name}</p>
            {r.achieved && r.score && (
              <Tooltip target={rightID} className={styles.tooltip}>
                <div className={styles.contentWrapper}>
                  <p>
                    Achieved: <span>{r.achieved}</span>
                  </p>
                  <p>
                    Score: <span>{r.score}</span>
                  </p>
                </div>
              </Tooltip>
            )}
            <p
              data-category={r.name}
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

function getElementID(name) {
  const firstChar = name[0];
  if (!isNaN(Number(firstChar))) {
    name = "_" + name;
  }

  return name.replace("!", "").split(" ").join("");
}
