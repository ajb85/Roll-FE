import { useCallback } from "react";
import { ImDice } from "react-icons/im";
import { GiRollingDices } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";

import { useScreenSize, useColorMode } from "hooks/";
import { goHome, hexToRGBA } from "js/utility.js";

import styles from "./Header.module.scss";

export default function Header(props) {
  const { colors } = useColorMode();
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
    <header
      className={styles.header}
      style={{ boxShadow: `0px 0px 10px 2px ${hexToRGBA(colors.secondary, 0.2)}` }}
    >
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
