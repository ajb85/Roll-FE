import { useCallback } from "react";
import { ImDice } from "react-icons/im";
import { GiRollingDices } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";

import { useScreenSize } from "hooks/";
import { goHome } from "js/utility.js";

import styles from "./Header.module.scss";

export default function Header(props) {
  const { isDesktop } = useScreenSize();
  const { pathname } = useLocation();
  const history = useHistory();

  const createGame = useCallback(() => {
    history.push("/game/create");
  }, [history]);

  const joinGame = useCallback(() => {
    history.push("/game/join");
  }, [history]);

  return (
    <header className={styles.header}>
      <div>
        <h1 onClick={goHome}>Roll!</h1>
        <nav>
          <div>
            {isDesktop ? (
              <p className={pathname === "/game/create" ? styles.active : ""} onClick={createGame}>
                New Game
              </p>
            ) : (
              <ImDice onClick={createGame} />
            )}
          </div>
          <div>
            {isDesktop ? (
              <p className={pathname === "/game/join" ? styles.active : ""} onClick={joinGame}>
                Join Game
              </p>
            ) : (
              <GiRollingDices onClick={joinGame} />
            )}
          </div>
          <div>
            <FiSettings />
          </div>
        </nav>
      </div>
    </header>
  );
}
