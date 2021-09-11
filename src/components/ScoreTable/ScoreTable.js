import React from "react";

import ScoreRows from "./ScoreRows.js";

import predictScore from "js/predictScore.js";

import { useScreenSize, useViewingPlayer } from "hooks/";

import styles from "./ScoreTable.module.scss";
import { combineClasses } from "js/utility.js";

export default React.memo(function ScoreTable({ game, selectedCategory, toggleCategory }) {
  const { scores, rolls, isUsersTurn } = game;
  const { isMobile } = useScreenSize();
  const { viewingPlayer } = useViewingPlayer();

  const rawUserScore = scores[viewingPlayer]?.score || {};
  const dice = rolls?.length ? rolls[rolls.length - 1] : [];
  const userScore = selectedCategory
    ? predictScore(selectedCategory, dice, rawUserScore)
    : rawUserScore || {};

  return (
    <div
      className={combineClasses(styles.table, isMobile ? styles.mobileScore : styles.score)}
      style={{ opacity: isUsersTurn ? 1 : 0.5 }}
    >
      <div className={styles.header}>
        <p>Category</p>
        <p>Score</p>
        <p>Category</p>
        <p>Score</p>
      </div>
      <ScoreRows
        userScore={userScore}
        rawUserScore={rawUserScore}
        game={game}
        selectedCategory={selectedCategory}
        toggleCategory={toggleCategory}
      />
      <div className={styles.footer} style={{ fontWeight: 800 }}>
        <div />
        <p>Grand Total</p>
        <p>{userScore["Grand Total"] || 0}</p>
      </div>
    </div>
  );
});
