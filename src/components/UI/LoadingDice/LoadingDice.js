import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

function LoadingDice({ fontSize = '1.2rem', dice = [1, 2, 3] }) {
  const conversion = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six'
  };
  return (
    <div className={styles.loadingDice}>
      {dice.map((d, i) => (
        <div
          key={`${d} at ${i}`}
          style={{
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${dice.length / 2}s`
          }}
        >
          <FontAwesomeIcon
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${dice.length / 2}s`,
              fontSize
            }}
            icon={['fal', `dice-${conversion[d]}`]}
          />
        </div>
      ))}
    </div>
  );
}

export default LoadingDice;
