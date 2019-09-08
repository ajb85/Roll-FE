import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Prompt from 'components/UI/Prompt/';

import { getUsersGames, leaveGame } from 'reducers/games.js';
import styles from './styles.module.scss';

function Table(props) {
  const { getUsersGames, games } = props;
  const [pagination, setPagination] = useState({
    limit: 5,
    offset: 0,
    max: props.games.length - 1
  });

  const [prompt, setPrompt] = useState(false);
  const [game, setGame] = useState({});

  useEffect(() => {
    getUsersGames();
  }, [getUsersGames]);
  useEffect(() => {
    setPagination(p => ({ ...p, max: games.length - 1 }));
  }, [games, setPagination]);

  const getRows = () => {
    const rows = [];
    if (games.length) {
      for (
        let i = pagination.offset;
        i < pagination.offset + pagination.limit;
        i++
      ) {
        const g = i < games.length ? games[i] : null;
        const goToGame = () => {
          props.history.push(`/game/play/${g.name}`);
        };

        rows.push(
          g ? (
            <tr key={g.game_id}>
              <td onClick={goToGame}>{g.name}</td>
              <td onClick={goToGame}>{g.players.length}</td>
              <td
                style={{ color: 'red' }}
                onClick={() => {
                  setGame(g);
                  setPrompt(true);
                }}
              >
                X
              </td>
            </tr>
          ) : (
            <tr key={`No Game ${i}`}>
              <td colSpan="3"></td>
            </tr>
          )
        );
      }
    } else {
      rows.push(
        <tr key="No Games">
          <td
            className={styles.noGames}
            colSpan="3"
            style={{ textAlign: 'center' }}
          >
            No games to display
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <React.Fragment>
      <Prompt
        cancel={() => setPrompt(false)}
        confirm={() => {
          setPrompt(false);
          props.leaveGame(game.game_id);
          setGame({});
        }}
        copy="Are you sure you want to leave? You may not be able to rejoin."
        showPrompt={prompt}
        game={game}
      />
      <table className={styles.GameTable}>
        <thead>
          <tr>
            <th>Game</th>
            <th>Players</th>
            <th>Leave</th>
          </tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>

      <div className={styles.pagination}>
        <p
          className={pagination.offset === 0 ? styles.inactive : ''}
          onClick={() =>
            pagination.offset > 0
              ? setPagination({
                  ...pagination,
                  offset: pagination.offset - pagination.limit
                })
              : null
          }
        >
          {games.length > 5 ? '< Prev Page' : ''}
        </p>
        <p
          className={
            pagination.offset + pagination.limit >= pagination.max
              ? styles.inactive
              : ''
          }
          onClick={() =>
            pagination.offset + pagination.limit < pagination.max
              ? setPagination({
                  ...pagination,
                  offset: pagination.offset + pagination.limit
                })
              : null
          }
        >
          {games.length > 5 ? 'Next Page >' : ''}
        </p>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  games: state.games.active
});
export default connect(
  mapStateToProps,
  { getUsersGames, leaveGame }
)(Table);
