import React from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

function Buttons(props) {
  const history = useHistory();
  return (
    <div className={styles.Buttons}>
      <button onClick={() => history.push('/game/create')}>Create Game</button>
      <button onClick={() => history.push('/game/join')}>Join Game</button>
    </div>
  );
}

export default Buttons;
