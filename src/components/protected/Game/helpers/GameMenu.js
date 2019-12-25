import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import history from 'history.js';
import LightMode from 'components/UI/LightMode';
import { getGameRound } from 'js/rounds';
// import { colorContext } from 'js/Colors.js';

import styles from '../styles.module.scss';

function GameMenu({ game, togglePrompt, isOwner }) {
  // const { colors } = React.useContext(colorContext);
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
      <table className={styles.menu}>
        <thead>
          <tr>
            <th>Current Game</th>
            <th>Players</th>
            <th>Round</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{game.name}</td>
            <td>{game.playerCount}</td>
            <td>{getGameRound(game ? game.scores : [])}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default GameMenu;
