import React from "react";
import { useSelector } from "react-redux";

import ScoreRows from "./ScoreRows.js";

import predictScore from "js/predictScore.js";

import useColorMode from "hooks/useColorMode.js";
import { Table } from "../Styles.js";
import styles from "../styles.module.scss";

function ScoreTable({ localState, toggleSelected }) {
  const { game, selected, isTurn, viewing } = localState;
  const { scores, rolls } = game;
  const { user_id } = useSelector((state) => ({ user_id: state.account.id }));

  const rawUserScore = scores[viewing] ? scores[viewing].score : {};
  const dice = rolls && rolls.length ? rolls[rolls.length - 1] : [];
  const userScore = selected
    ? predictScore(selected, dice, rawUserScore)
    : rawUserScore || {};
  const isViewingSelf = viewing === user_id;

  const { colors } = useColorMode();

  return (
    <Table
      colors={colors}
      className={styles.score}
      style={{ opacity: isTurn ? 1 : 0.5 }}
    >
      <div className={styles.header}>
        <p>Category</p>
        <p>Score</p>
        <p>Category</p>
        <p>Score</p>
      </div>
      <ScoreRows
        localState={localState}
        isViewingSelf={isViewingSelf}
        userScore={userScore}
        toggleSelected={toggleSelected}
        rawUserScore={rawUserScore}
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
