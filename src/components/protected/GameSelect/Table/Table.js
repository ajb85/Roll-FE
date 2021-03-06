import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Prompt from "components/UI/Prompt";

import useColorMode from "hooks/useColorMode.js";
import { isUsersTurn } from "js/rounds.js";

import { getUsersGames, leaveGame } from "reducers/games.js";
import { populateAccount } from "reducers/account.js";

import { Row } from "./Styles.js";
import styles from "./styles.module.scss";

function Table(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [game, setGame] = useState({});
  const { colors } = useColorMode();
  const { games, user_id } = useSelector((state) => ({
    games: state.games.active,
    user_id: state.account.id,
  }));

  const [pagination, setPagination] = useState({
    limit: 5,
    offset: 0,
    max: games.length || 5,
  });

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    dispatch(getUsersGames());
  }, [dispatch]);

  useEffect(() => {
    if (!user_id) {
      dispatch(populateAccount());
    }
  }, [dispatch, user_id]);

  useEffect(() => {
    games.forEach((g) => {
      g.isUsersTurn = isUsersTurn(g.scores, user_id) ? 1 : 0;
      g.isActive = g.isActive ? 1 : 0;
    });
  }, [games, user_id]);

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
    const sorted = [...games].sort((a, b) =>
      a.isActive < b.isActive
        ? 1
        : a.isActive > b.isActive
        ? -1
        : a.isUsersTurn === b.isUsersTurn
        ? 0
        : a.isUsersTurn < b.isUsersTurn
        ? 1
        : -1
    );
    const rows = [];
    if (sorted.length) {
      for (
        let i = pagination.offset;
        i < pagination.offset + pagination.limit;
        i++
      ) {
        const g = i < sorted.length ? sorted[i] : null;
        const goToGame = () => {
          history.push(`/game/play/${g.game_id}`);
        };

        rows.push(
          g ? (
            <Row
              key={g.game_id}
              colors={colors}
              isUsersTurn={g.isUsersTurn}
              isActive={g.isActive}
            >
              <td onClick={goToGame} style={{ cursor: "pointer" }}>
                {g.name}
              </td>
              <td onClick={goToGame} style={{ cursor: "pointer" }}>
                {g.playerCount}
              </td>
              <td
                style={{
                  color: g.isActive ? "red" : "green",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setGame(g);
                  setShowPrompt(true);
                }}
              >
                {g.isActive ? "X" : "✓"}
              </td>
            </Row>
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
    dispatch(leaveGame(game.game_id));
    setShowPrompt(false);
    setGame({});
  };

  return (
    <React.Fragment>
      {showPrompt && (
        <Prompt action={leave} cancel={setShowPrompt.bind(this, false)}>
          {game.isActive
            ? "Are you sure you want to leave? You may not be able to rejoin."
            : "Clear this game from your list?"}
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
                  offset: pagination.offset - pagination.limit,
                })
              : null
          }
        >
          {games.length > 5 ? "< Prev Page" : ""}
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
                  offset: pagination.offset + pagination.limit,
                })
              : null
          }
        >
          {games.length > 5 ? "Next Page >" : ""}
        </p>
      </div>
    </React.Fragment>
  );
}

export default Table;
