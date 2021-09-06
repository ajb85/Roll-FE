import { useState, useEffect, useCallback } from "react";

import GameRow from "./GameRow.js";
import NoGames from "./NoGames.js";
// import GameFilters from "./GameFilters.js";
import Prompt from "components/Prompt/";
import Pagination from "components/Pagination/";

import { useGames, usePagination, useColorMode } from "hooks/";

import styles from "./GameList.module.scss";

// const initialFilters = {
//   name: localStorage.getItem("nameFilter") || "",
//   isActive: JSON.parse(localStorage.getItem("isActiveFilter")) || true,
//   isUsersTurn: JSON.parse(localStorage.getItem("isUsersTurnFilter")) || false,
// };

export default function GameList(props) {
  const { games, getUsersGames, leaveGame } = useGames();
  const { colors } = useColorMode();
  const paginationData = usePagination(games.length);
  const { pagination } = paginationData;

  const [game, setGame] = useState({});
  // const [filters, setFilters] = useState(initialFilters);

  const closePrompt = useCallback(() => setGame({}), [setGame]);

  const leave = useCallback(() => {
    leaveGame(game.game_id);
    closePrompt();
  }, [leaveGame, closePrompt, game.game_id]);

  useEffect(getUsersGames, [getUsersGames]);

  // useEffect(() => {
  //   Object.keys(filters).forEach((key) => {
  //     localStorage.setItem(`${key}Filter`, filters[key]);
  //   });
  // }, [filters]);

  const sorted = [...games].sort(sortGames);
  const paginatedRows = sorted.slice(pagination.offset, pagination.offset + pagination.limit);

  return (
    <>
      <Prompt isOpen={game.game_id} primaryButton={{ onClick: leave }} close={closePrompt}>
        {game.isActive
          ? "Are you sure you want to leave? You may not be able to rejoin."
          : "Clear this game from your list?"}
      </Prompt>

      {/* <GameFilters filters={filters} setFilters={setFilters} /> */}

      <table className={styles.GameTable}>
        <thead style={{ borderColor: colors.secondary }}>
          <tr className={styles.headerRow}>
            <th>Game</th>
            <th>Round</th>
            <th>Players</th>
            <th>Leave</th>
          </tr>
        </thead>
        <tbody>
          {!paginatedRows.length && <NoGames key="No Games" />}
          {paginatedRows.map((g) => (
            <GameRow key={g.game_id} game={g} setGame={setGame} />
          ))}
        </tbody>
      </table>

      <Pagination {...paginationData} />
    </>
  );
}

function sortGames(a, b) {
  if (a.isActive !== b.isActive) {
    return a.isActive < b.isActive ? 1 : -1;
  }

  if (a.isUsersTurn !== b.isUsersTurn) {
    return a.isUsersTurn ? -1 : 1;
  }

  return 0;
}
