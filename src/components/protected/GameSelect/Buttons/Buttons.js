import React from 'react';
import styles from './styles.module.scss';

function Buttons(props) {
  return (
    <div className={styles.Buttons}>
      <button onClick={() => props.history.push('/game/create')}>
        Create Game
      </button>
      <button onClick={() => props.history.push('/game/join')}>
        Join Game
      </button>
    </div>
  );
}

export default Buttons;
