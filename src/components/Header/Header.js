import { useCallback } from "react";
import { connect } from "react-redux";
import { ImDice } from "react-icons/im";
import { GiRollingDices } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import LightMode from "components/UI/LightMode/";

import useScreenSize from "hooks/useScreenSize.js";

import styles from "./Header.module.scss";

function Header(props) {
  const { isDesktop } = useScreenSize();
  const history = useHistory();

  const createGame = useCallback(() => {
    history.push("/game/create");
  }, [history]);

  const joinGame = useCallback(() => {
    history.push("/game/join");
  }, [history]);

  if (!props.showHeader) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div>
        <h1>Roll!</h1>
        <nav>
          <div>
            {isDesktop ? (
              <p onClick={createGame}>New Game</p>
            ) : (
              <ImDice onClick={createGame} />
            )}
          </div>
          <div>
            {isDesktop ? (
              <p onClick={joinGame}>Join Game</p>
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

const mapStateToProps = (state) => ({
  showHeader: state.app.showHeader,
});

export default connect(mapStateToProps, null)(Header);
