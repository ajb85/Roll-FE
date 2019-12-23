import React from 'react';

import { leftCategories, rightCategories } from 'js/categories.js';
import { colorContext } from 'js/Colors';

// import styles from '../styles.module.scss';

function ScoreRow(props) {
  const { colors } = React.useContext(colorContext);
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

        const leftBG = lClickable
          ? selected === l.name
            ? colors.brightAccent
            : rawUserScore[l.name]
            ? colors.primary
            : colors.accent
          : colors.primary;

        const rightBG = rClickable
          ? selected === r.name
            ? colors.brightAccent
            : rawUserScore[r.name]
            ? colors.primary
            : colors.accent
          : colors.primary;
        return (
          <tr key={`${l.name} ${r.name}`}>
            <td>{l.name}</td>
            <td
              id={l.name}
              onClick={e => (lClickable ? toggleSelected(e) : null)}
              style={{
                backgroundColor: leftBG,
                color: selected === l.name ? 'black' : colors.secondary
              }}
            >
              {userScore[l.name]}
            </td>
            <td>{leader.score[l.name]}</td>
            <td>{r.name}</td>
            <td
              id={r.name}
              onClick={e => (rClickable ? toggleSelected(e) : null)}
              style={{
                backgroundColor: rightBG,
                color: selected === r.name ? 'black' : colors.secondary
              }}
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
