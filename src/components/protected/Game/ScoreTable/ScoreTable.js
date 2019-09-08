import React from 'react';

import predictScore from 'js/predictScore.js';
import styles from '../styles.module.scss';

function ScoreTable({ game, selected, setSelected }) {
  const { scores, rolls } = game;
  const dice = rolls && rolls.length ? rolls[rolls.length - 1] : [];
  const userScore = selected
    ? predictScore(selected, dice, scores.user)
    : scores.user || {};
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

        return (
          <tr key={`${l.name} ${r.name}`}>
            <td>{l.name}</td>
            {l.isClickable && game.rolls.length ? (
              <td
                id={l.name}
                onClick={e => toggleSelected(e)}
                className={
                  selected === l.name
                    ? styles.selected
                    : scores.user[l.name]
                    ? null
                    : styles.scoreCell
                }
              >
                {userScore[l.name]}
              </td>
            ) : (
              <td>{userScore[l.name]}</td>
            )}
            <td>{scores.leader[l.name]}</td>
            <td>{r.name}</td>
            {r.isClickable && game.rolls.length ? (
              <td
                id={r.name}
                onClick={e => toggleSelected(e)}
                className={
                  selected === r.name
                    ? styles.selected
                    : scores.user[r.name]
                    ? null
                    : styles.scoreCell
                }
              >
                {userScore[r.name]}
              </td>
            ) : (
              <td>{userScore[r.name]}</td>
            )}
            <td>{scores.leader[r.name]}</td>
          </tr>
        );
      })}

      <tr style={{ fontWeight: 800 }}>
        <td style={{ padding: '5px', fontSize: '1rem' }} colSpan="4">
          Grand Total
        </td>
        <td style={{ padding: '5px', fontSize: '1rem' }}>
          {userScore['Grand Total']}
        </td>
        <td style={{ padding: '5px', fontSize: '1rem' }}>
          {scores.leader['Grand Total']}
        </td>
      </tr>
    </tbody>
  );
}

export default ScoreTable;
