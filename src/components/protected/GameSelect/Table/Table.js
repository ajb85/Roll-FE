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
  const setOffset = value => setPagination({ ...pagination, offset: value });
  const { getUsersGames, games } = props;
  useEffect(() => {
    getUsersGames();
  }, [getUsersGames]);
  useEffect(() => {
    setPagination({ ...pagination, max: games.length - 1 });
  }, [games, setPagination]);

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
        <tbody>
          {games
            .filter(
              (g, i) =>
                i >= pagination.offset &&
                i < pagination.offset + pagination.limit
            )
            .map(g => (
              <tr key={g.id}>
                <td>{g.name}</td>
                <td>{g.players.filter(p => p !== null).length}</td>
                <td>5</td>
              </tr>
            ))}
        </tbody>
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
          {'<'} Prev Page
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
          Next Page {'>'}
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
