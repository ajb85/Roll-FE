import { useCallback } from "react";
import { FiSettings } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";

import { useScreenSize } from "hooks/";
import { goHome } from "js/utility.js";

import styles from "./Header.module.scss";

export default function Header(props) {
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
            <p className={pathname === "/game/create" ? styles.active : ""} onClick={createGame}>
              New Game
            </p>
          </div>
          <div>
            <p className={pathname === "/game/join" ? styles.active : ""} onClick={joinGame}>
              Join Game
            </p>
          </div>
          <div>
            <FiSettings />
          </div>
        </nav>
      </div>
    </header>
  );
}
