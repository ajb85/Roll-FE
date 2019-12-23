import React, { useContext } from 'react';
import { connect } from 'react-redux';

import ScoreRows from './ScoreRows.js';

import predictScore from 'js/predictScore.js';

import { colorContext } from 'js/Colors.js';
import { Table } from '../Styles.js';
import styles from '../styles.module.scss';

function ScoreTable({ game, selected, toggleSelected, user_id, isTurn }) {
  const { scores, rolls } = game;
  const rawUserScore = scores[user_id] ? scores[user_id].score : {};
  const dice = rolls && rolls.length ? rolls[rolls.length - 1] : [];
  const userScore = selected
    ? predictScore(selected, dice, rawUserScore)
    : rawUserScore || {};

  const { colors } = useContext(colorContext);

  const leader = Object.values(game.scores).reduce((top, cur) =>
    top
      ? cur.score['Grand Total'] > top.score['Grand Total']
        ? cur
        : top
      : cur
  );

  return (
    <Table
      colors={colors}
      className={styles.score}
      style={{ opacity: isTurn ? 1 : 0.5 }}
    >
      <thead>
        <tr>
          <th>Category</th>
          <th>You</th>
          <th>Top</th>
          <th>Category</th>
          <th>You</th>
          <th>Top</th>
        </tr>
      </thead>
      <tbody>
        <ScoreRows
          isTurn={isTurn}
          game={game}
          rawUserScore={rawUserScore}
          toggleSelected={toggleSelected}
          selected={selected}
          userScore={userScore}
          leader={leader}
        />
        <tr style={{ fontWeight: 800 }}>
          <td style={{ padding: '5px', fontSize: '0.8rem' }} colSpan='4'>
            Grand Total
          </td>
          <td style={{ padding: '5px', fontSize: '0.8rem' }}>
            {userScore['Grand Total']}
          </td>
          <td style={{ padding: '5px', fontSize: '0.8rem' }}>
            {leader.score['Grand Total']}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

const mapStateToProps = state => ({
  user_id: state.account.id
});

export default connect(mapStateToProps, {})(ScoreTable);
