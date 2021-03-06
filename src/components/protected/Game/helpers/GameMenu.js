import React from "react";

import LightMode from "components/UI/LightMode";

import history from "history.js";

import styles from "../styles.module.scss";

function GameMenu({ game, togglePrompt, isOwner }) {
  return (
    <>
      <div className={styles.controls}>
        <p>chevron-square-left</p>
        <LightMode inline={true} />
        {game.isJoinable ? "lock-open-alt" : "lock-alt"}
        {isOwner && "user-plus"}
      </div>
      <h2>{game.name}</h2>
    </>
  );
}

export default GameMenu;
