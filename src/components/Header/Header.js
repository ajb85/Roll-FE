import { useCallback } from "react";
import { FiSettings } from "react-icons/fi";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import { useHistory, useLocation } from "react-router-dom";

import { goHome } from "js/utility.js";
import { useSocket } from "hooks";

import styles from "./Header.module.scss";

export default function Header(props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const { isConnected } = useSocket();

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
          <div className={styles.wifi}>
            {isConnected ? (
              <BiWifi style={{ color: "green" }} />
            ) : (
              <BiWifiOff style={{ color: "grey" }} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
