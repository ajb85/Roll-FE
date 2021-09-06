import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useColorMode } from "hooks/";

import { Row } from "./Styles.js";
import styles from "./GameList.module.scss";

export default function GameRow(props) {
  const g = props.game;
  const { setGame } = props;

  const history = useHistory();
  const { colors } = useColorMode();

  const goToGame = useCallback(() => history.push(`/game/play/${g.game_id}`), [g.game_id, history]);
  const selectGame = useCallback(() => setGame(g), [setGame, g]);

  return (
    <Row colors={colors} isUsersTurn={g.isUsersTurn} isActive={g.isActive} className={styles.row}>
      <td onClick={goToGame}>{g.name}</td>
      <td onClick={goToGame}>{g.currentRound}/13</td>
      <td onClick={goToGame}>{g.playerCount}</td>
      <td className={g.isActive ? styles.active : styles.completed} onClick={selectGame}>
        {g.isActive ? "X" : "✓"}
      </td>
    </Row>
  );
}
