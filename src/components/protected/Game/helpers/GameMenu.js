import React from 'react';

import history from 'history.js';
import { getGameRound } from 'js/rounds';

import styles from '../styles.module.scss';

function GameMenu({ game }) {
  return (
    <table className={styles.stats}>
      <thead>
        <tr>
          <th style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>
            Back to
          </th>
          <th>Game</th>
          <th>Players</th>
          <th>Round</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>
            Lobby
          </td>
          <td>{game.name}</td>
          <td>{game.playerCount}</td>
          <td>{getGameRound(game ? game.scores : [])}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default GameMenu;
