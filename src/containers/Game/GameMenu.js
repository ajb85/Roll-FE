import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";

import LightMode from "components/LightMode";

import { goHome, noFunc } from "js/utility.js";

import styles from "./Game.module.scss";

function GameMenu({ game, promptOn, isOwner }) {
  const { isJoinable } = game;
  const addUserStyle = {
    opacity: isJoinable ? 1 : 0.5,
    cursor: isJoinable ? "pointer" : "initial",
  };

  const addUserClick = isJoinable ? promptOn : noFunc;

  return (
    <>
      <div className={styles.controls}>
        <IoMdArrowRoundBack onClick={goHome} />
        <LightMode inline />
        {isJoinable ? (
          <BsFillUnlockFill style={{ opacity: isOwner ? 1 : 0.5 }} />
        ) : (
          <BsFillLockFill style={{ opacity: 0.5, cursor: "initial" }} />
        )}
        {isOwner && <FaUserPlus style={addUserStyle} onClick={addUserClick} />}
      </div>
      <h2>{game.name}</h2>
    </>
  );
}

export default GameMenu;
