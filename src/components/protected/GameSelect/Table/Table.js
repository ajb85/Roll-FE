import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Prompt from 'components/UI/Prompt';

import { colorContext } from 'js/Colors.js';

import { getUsersGames, leaveGame } from 'reducers/games.js';
import styles from './styles.module.scss';

function Table(props) {
  const { getUsersGames, games, leaveGame } = props;
  const history = useHistory();
  const [game, setGame] = useState({});
  const { colors } = useContext(colorContext);

  const [pagination, setPagination] = useState({
    limit: 5,
    offset: 0,
    max: props.games.length || 5
  });

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    getUsersGames();
  }, [getUsersGames]);

  useEffect(() => {
    let current = { ...pagination };
    current.max = games.length || 5;
    while (current.offset >= current.max) {
      current.offset -= current.limit;
    }

    if (
      current.offset !== pagination.offset ||
      current.limit !== pagination.limit ||
      current.max !== pagination.max
    ) {
      setPagination(current);
    }
  }, [games, pagination, setPagination]);

  const getRows = () => {
    const sorted = [...games].sort((a, b) => {
      const aTurn = a.round - a.userRound;
      const bTurn = b.round - b.userRound;
      return aTurn > bTurn ? 1 : aTurn < bTurn ? -1 : 0;
    });

    const rows = [];
    if (sorted.length) {
      for (
        let i = pagination.offset;
        i < pagination.offset + pagination.limit;
        i++
      ) {
        const g = i < sorted.length ? sorted[i] : null;
        const goToGame = () => {
          history.push(`/game/play/${g.name}`);
        };

        rows.push(
          g ? (
            <tr key={g.game_id}>
              <td onClick={goToGame} style={{ cursor: 'pointer' }}>
                {g.name}
              </td>
              <td onClick={goToGame} style={{ cursor: 'pointer' }}>
                {g.playerCount}
              </td>
              <td
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => {
                  setGame(g);
                  setShowPrompt(true);
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
        <tr key="No Games" className={styles.noGames}>
          <td className={styles.noGames} colSpan="3">
            <p>No games to display</p>
          </td>
        </tr>
      );
    }
    return rows;
  };

  const leave = () => {
    leaveGame(game.game_id);
    setShowPrompt(false);
    setGame({});
  };

  return (
    <React.Fragment>
      {showPrompt && (
        <Prompt
          action={leave}
          cancel={() => {
            setShowPrompt(false);
          }}
        >
          Are you sure you want to leave? You may not be able to rejoin.
        </Prompt>
      )}
      <table className={styles.GameTable}>
        <thead style={{ borderColor: colors.secondary }}>
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
          className={pagination.offset === 0 ? styles.inactive : styles.active}
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
            pagination.offset + pagination.limit > pagination.max
              ? styles.inactive
              : styles.active
          }
          onClick={() =>
            pagination.offset + pagination.limit <= pagination.max
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
export default connect(mapStateToProps, { getUsersGames, leaveGame })(Table);
