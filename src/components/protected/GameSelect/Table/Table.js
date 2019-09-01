import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersGames } from 'reducers/account.js';

import styles from './styles.module.scss';

function Table(props) {
  const [pagination, setPagination] = useState({
    limit: 5,
    offset: 0,
    max: props.games.length - 1
  });
  // const setOffset = value => setPagination({ ...pagination, offset: value });
  const { getUsersGames, games } = props;
  useEffect(() => {
    getUsersGames();
  }, [getUsersGames]);
  useEffect(() => {
    setPagination({ ...pagination, max: games.length - 1 });
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
        rows.push(
          g ? (
            <tr key={g.game_id}>
              <td>{g.name}</td>
              <td>{g.players.length}</td>
              <td>5</td>
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
      <table className={styles.GameTable}>
        <thead>
          <tr>
            <th>Game</th>
            <th>Players</th>
            <th>Round</th>
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
  games: state.account.games
});
export default connect(
  mapStateToProps,
  { getUsersGames }
)(Table);
