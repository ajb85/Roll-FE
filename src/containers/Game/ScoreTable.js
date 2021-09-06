import React from "react";

import ScoreRows from "./ScoreRows.js";

import predictScore from "js/predictScore.js";

import { useColorMode, useAccount } from "hooks/";

import { Table } from "./Styles.js";
import styles from "./Game.module.scss";

function ScoreTable({ game, viewingPlayer, viewPlayer, selectedCategory, toggleCategory }) {
  const { scores, rolls, isUsersTurn } = game;
  const { user_id } = useAccount();
  const { colors } = useColorMode();

  const rawUserScore = scores[viewingPlayer]?.score || {};
  const dice = rolls?.length ? rolls[rolls.length - 1] : [];
  const isViewingSelf = viewingPlayer === user_id;
  const userScore = selectedCategory
    ? predictScore(selectedCategory, dice, rawUserScore)
    : rawUserScore || {};

  return (
    <Table colors={colors} className={styles.score} style={{ opacity: isUsersTurn ? 1 : 0.5 }}>
      <div className={styles.header}>
        <p>Category</p>
        <p>Score</p>
        <p>Category</p>
        <p>Score</p>
      </div>
      <ScoreRows
        isViewingSelf={isViewingSelf}
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
    </Table>
  );
}

export default ScoreTable;
