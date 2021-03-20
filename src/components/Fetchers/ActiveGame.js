import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchGame } from "reducers/games.js";

export default function ActiveGame(props) {
  const { game_id } = useParams();
  
  // const activeGame = useSelector(
  //   (state) => state.games.active.find((game) => game.game_id === game_id) // !!! O(n) per refresh
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGame(game_id));
  }, [game_id, dispatch]);

  return null;
}
