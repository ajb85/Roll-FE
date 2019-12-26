import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LightMode from 'components/UI/LightMode';

import history from 'history.js';

import styles from '../styles.module.scss';

function GameMenu({ game, togglePrompt, isOwner }) {
  return (
    <>
      <div className={styles.controls}>
        <FontAwesomeIcon
          icon='chevron-square-left'
          onClick={() => history.push('/')}
        />
        <LightMode inline={true} />
        <FontAwesomeIcon
          icon={game.isJoinable ? 'lock-open-alt' : 'lock-alt'}
          style={{ opacity: isOwner ? 1 : 0.5 }}
        />
        {isOwner && <FontAwesomeIcon icon='user-plus' onClick={togglePrompt} />}
      </div>
      <h2>{game.name}</h2>
    </>
  );
}

export default GameMenu;
