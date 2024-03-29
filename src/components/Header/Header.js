import { useState, useCallback } from "react";
import { FiSettings } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { useHistory, useLocation } from "react-router-dom";

import Dropdown from "components/Dropdown/";

import { goHome } from "js/utility.js";

import styles from "./Header.module.scss";

export default function Header(props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const [settingsPrompt, setSettingsPrompt] = useState(false);

  const createGame = useCallback(() => {
    history.push("/game/create");
  }, [history]);

  const discordOAuth = useCallback(() => {
    history.push("/oauth/discord");
  }, [history]);

  const editColors = useCallback(() => {
    history.push("/colors");
  }, [history]);

  const toggleSettingsPrompt = useCallback(() => {
    setSettingsPrompt(!settingsPrompt);
  }, [settingsPrompt, setSettingsPrompt]);

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
          <div onClick={discordOAuth}>
            <SiDiscord />
          </div>
          <div className={styles.settingsMenu}>
            <Dropdown
              right
              isOpen={settingsPrompt}
              toggle={toggleSettingsPrompt}
              menu={[{ label: "Colors", onClick: editColors }]}
            >
              <FiSettings onClick={toggleSettingsPrompt} />
            </Dropdown>
          </div>
        </nav>
      </div>
    </header>
  );
}
