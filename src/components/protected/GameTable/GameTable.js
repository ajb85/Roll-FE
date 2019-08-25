import React from 'react';
import styles from './styles.module.scss';

function GameTable(props) {
  return (
    <table className={styles.GameTable}>
      <thead>
        <tr>
          <th>Game</th>
          <th>Players</th>
          <th>Round</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>My Fake Game</td>
          <td>2</td>
          <td>5</td>
        </tr>
        <tr>
          <td>My Fake Game</td>
          <td>2</td>
          <td>5</td>
        </tr>
        <tr>
          <td>My Fake Game</td>
          <td>2</td>
          <td>5</td>
        </tr>
        <tr>
          <td>My Fake Game</td>
          <td>2</td>
          <td>5</td>
        </tr>
        <tr>
          <td>My Fake Game</td>
          <td>2</td>
          <td>5</td>
        </tr>
        <tr>
          <td>My Fake Game</td>
          <td>2</td>
          <td>5</td>
        </tr>
      </tbody>
    </table>
  );
}

export default GameTable;
