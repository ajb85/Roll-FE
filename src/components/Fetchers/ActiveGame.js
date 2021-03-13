import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchGame } from "reducers/games.js";

export default function ActiveGame(props) {
  const { game_id } = useParams();
  console.log("GAME ID: ", game_id);
  const activeGame = useSelector(
    (state) => state.games.active.find((game) => game.game_id === game_id) // !!! O(n) per refresh
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("FETCHING GAME");
    dispatch(fetchGame(game_id));
  }, [game_id]);

  return null;
}
