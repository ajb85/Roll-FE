import React from 'react';
import styles from './styles.module.scss';

function Buttons(props) {
  return (
    <div className={styles.Buttons}>
      <button>Create Game</button>
      <button>Join Game</button>
    </div>
  );
}

export default Buttons;
