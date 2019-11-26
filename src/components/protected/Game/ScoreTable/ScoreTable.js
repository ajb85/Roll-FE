import React from 'react';
import { connect } from 'react-redux';

import predictScore from 'js/predictScore.js';
import styles from '../styles.module.scss';

function ScoreTable({ game, selected, setSelected, user_id, isTurn }) {
  const { scores, rolls } = game;
  const rawUserScore = scores[user_id] ? scores[user_id].score : {};
  const dice = rolls && rolls.length ? rolls[rolls.length - 1] : [];
  const userScore = selected
    ? predictScore(selected, dice, rawUserScore)
    : rawUserScore || {};

  const leader = Object.values(game.scores).reduce((top, cur) =>
    top
      ? cur.score['Grand Total'] > top.score['Grand Total']
        ? cur
        : top
      : cur
  );

  const toggleSelected = e => {
    setSelected(e.target.id === selected ? null : e.target.id);
  };

  const leftCategories = [
    { name: 'Ones', isClickable: true },
    { name: 'Twos', isClickable: true },
    { name: 'Threes', isClickable: true },
    { name: 'Fours', isClickable: true },
    { name: 'Fives', isClickable: true },
    { name: 'Sixes', isClickable: true },
    { name: 'Left Bonus', isClickable: false },
    { name: 'Left Total', isClickable: false }
  ];

  const rightCategories = [
    { name: '3 of a Kind', isClickable: true },
    { name: '4 of a Kind', isClickable: true },
    { name: 'Full House', isClickable: true },
    { name: 'Sm Straight', isClickable: true },
    { name: 'Lg Straight', isClickable: true },
    { name: 'Roll!', isClickable: true },
    { name: 'Roll! Bonus', isClickable: false },
    { name: 'Free Space', isClickable: true }
  ];

  return (
    <tbody>
      {leftCategories.map((l, i) => {
        const r = rightCategories[i];
        const lClickable =
          isTurn &&
          l.isClickable &&
          game.rolls &&
          game.rolls.length &&
          rawUserScore[l.name] === null;
        const rClickable =
          isTurn &&
          r.isClickable &&
          game.rolls &&
          game.rolls.length &&
          rawUserScore[r.name] === null;
        return (
          <tr key={`${l.name} ${r.name}`}>
            <td>{l.name}</td>

            <td
              id={l.name}
              onClick={e => (lClickable ? toggleSelected(e) : null)}
              className={
                lClickable
                  ? selected === l.name
                    ? styles.selected
                    : rawUserScore[l.name]
                    ? null
                    : styles.scoreCell
                  : null
              }
            >
              {userScore[l.name]}
            </td>
            <td>{leader[l.name]}</td>
            <td>{r.name}</td>
            <td
              id={r.name}
              onClick={e => (rClickable ? toggleSelected(e) : null)}
              className={
                rClickable
                  ? selected === r.name
                    ? styles.selected
                    : rawUserScore[r.name]
                    ? null
                    : styles.scoreCell
                  : null
              }
            >
              {userScore[r.name]}
            </td>

            <td>{leader[r.name]}</td>
          </tr>
        );
      })}

      <tr style={{ fontWeight: 800 }}>
        <td style={{ padding: '5px', fontSize: '0.8rem' }} colSpan="4">
          Grand Total
        </td>
        <td style={{ padding: '5px', fontSize: '0.8rem' }}>
          {userScore['Grand Total']}
        </td>
        <td style={{ padding: '5px', fontSize: '0.8rem' }}>
          {leader['Grand Total']}
        </td>
      </tr>
    </tbody>
  );
}

const mapStateToProps = state => ({
  user_id: state.account.id
});

export default connect(mapStateToProps, {})(ScoreTable);
