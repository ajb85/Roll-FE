import React, { useContext } from 'react';
import { connect } from 'react-redux';

import ScoreRows from './ScoreRows.js';

import predictScore from 'js/predictScore.js';

import { colorContext } from 'js/Colors.js';
import { Table } from '../Styles.js';
import styles from '../styles.module.scss';

function ScoreTable({
  game,
  selected,
  toggleSelected,
  user_id,
  isTurn,
  viewing
}) {
  const { scores, rolls } = game;
  const rawUserScore = scores[viewing] ? scores[viewing].score : {};
  const dice = rolls && rolls.length ? rolls[rolls.length - 1] : [];
  const userScore = selected
    ? predictScore(selected, dice, rawUserScore)
    : rawUserScore || {};
  const isViewingSelf = viewing === user_id;

  const { colors } = useContext(colorContext);

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
        isTurn={isTurn}
        isViewingSelf={isViewingSelf}
        game={game}
        rawUserScore={rawUserScore}
        toggleSelected={toggleSelected}
        selected={selected}
        userScore={userScore}
      />
      <div className={styles.footer} style={{ fontWeight: 800 }}>
        <div />
        <p>Grand Total</p>
        <p>{userScore['Grand Total']}</p>
      </div>
    </Table>
  );
}

const mapStateToProps = state => ({
  user_id: state.account.id
});

export default connect(mapStateToProps, {})(ScoreTable);
