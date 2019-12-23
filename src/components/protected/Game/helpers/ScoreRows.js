import React from 'react';

import { leftCategories, rightCategories } from 'js/categories.js';

import styles from '../styles.module.scss';

function ScoreRow(props) {
  const {
    isTurn,
    game,
    rawUserScore,
    toggleSelected,
    selected,
    userScore,
    leader
  } = props;
  return (
    <>
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
            <td>{leader.score[l.name]}</td>
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
            <td>{leader.score[r.name]}</td>
          </tr>
        );
      })}
    </>
  );
}

export default ScoreRow;
