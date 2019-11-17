import React from 'react';
import { connect } from 'react-redux';

import predictScore from 'js/predictScore.js';
import styles from '../styles.module.scss';

function ScoreTable({ game, selected, setSelected, user_id }) {
  const { scores, rolls } = game;
  const rawUserScore = scores.find(s => s.user_id === user_id);
  const dice = rolls && rolls.length ? rolls[rolls.length - 1] : [];
  const userScore = selected
    ? predictScore(selected, dice, rawUserScore)
    : rawUserScore || {};
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
          l.isClickable &&
          game.rolls &&
          game.rolls.length &&
          rawUserScore[l.name] === null;
        const rClickable =
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
            <td>{scores[0][l.name]}</td>
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

            <td>{scores[0][r.name]}</td>
          </tr>
        );
      })}

      <tr style={{ fontWeight: 800 }}>
        <td style={{ padding: '5px', fontSize: '0.8rem' }} colSpan='4'>
          Grand Total
        </td>
        <td style={{ padding: '5px', fontSize: '0.8rem' }}>
          {userScore['Grand Total']}
        </td>
        <td style={{ padding: '5px', fontSize: '0.8rem' }}>
          {scores[0]['Grand Total']}
        </td>
      </tr>
    </tbody>
  );
}

const mapStateToProps = state => ({
  user_id: state.account.id
});

export default connect(mapStateToProps, {})(ScoreTable);
