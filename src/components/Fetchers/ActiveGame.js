import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGames } from "hooks/";

export default function ActiveGame(props) {
  const { game_id } = useParams();
  const { gamesLookup, fetchGame } = useGames();

  useEffect(() => {
    if (!gamesLookup[game_id]?.logs) {
      fetchGame(game_id);
    }
  }, [fetchGame, game_id, gamesLookup]);

  return null;
}
