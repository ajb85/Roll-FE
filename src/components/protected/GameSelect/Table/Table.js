import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { colorContext } from 'js/Colors.js';
import { PromptContext } from 'components/UI/Prompt/Context.js';

import { getUsersGames, leaveGame } from 'reducers/games.js';
import styles from './styles.module.scss';

function Table(props) {
  const { getUsersGames, games, leaveGame } = props;
  console.log('LENGTH: ', games.length);
  const history = useHistory();
  const [game, setGame] = useState({});
  const { colors } = useContext(colorContext);
  const { setPromptState, togglePrompt } = useContext(PromptContext);
  const [pagination, setPagination] = useState({
    limit: 5,
    offset: 0,
    max: props.games.length - 1
  });

  useEffect(() => {
    function confirmLeave() {
      leaveGame(game.game_id);
      togglePrompt();
      setGame({});
    }

    setPromptState({
      cancel: togglePrompt,
      confirm: confirmLeave,
      copy: 'Are you sure you want to leave? You may not be able to rejoin.'
    });

    // Including Prompt functions (from context) will cause
    // infinite loop.  What the function does will never change
    // but they gets a new value every prompt state change
    // eslint-disable-next-line
  }, [leaveGame, setGame, game, setPromptState.showPrompt]);

  useEffect(() => {
    getUsersGames();
  }, [getUsersGames]);

  useEffect(() => {
    setPagination(p => ({ ...p, max: games.length - 1 }));
  }, [games, setPagination]);

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
                  togglePrompt();
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
        {console.log('PAGINATION: ', pagination)}
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
