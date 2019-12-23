import React from 'react';

import history from 'history.js';
import { getGameRound } from 'js/rounds';
import { colorContext } from 'js/Colors.js';

import styles from '../styles.module.scss';

function GameMenu({ game }) {
  const { colors } = React.useContext(colorContext);
  return (
    <>
      <p
        style={{ borderColor: colors.secondary }}
        onClick={() => history.push('/')}
        className={styles.toLobby}
      >
        {'<'} Return to Lobby
      </p>
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
