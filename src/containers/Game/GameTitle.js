import { useState, useCallback, memo } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai";

import Dropdown from "components/Dropdown/";

import styles from "./Game.module.scss";

export default memo(function GameTitle(props) {
  return (
    <div className={styles.title}>
      <h2>Game: {props.game.name}</h2>
      <div className={styles.buttonGroup}>
        {props.isOwner && (
          <AiOutlineUserAdd
            onClick={props.promptOn}
            className={!props.game.isJoinable ? styles.disabled : ""}
          />
        )}
      </div>
    </div>
  );
});
