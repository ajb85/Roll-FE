import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";

import LightMode from "components/UI/LightMode";

import { routeUser } from "js/utility.js";

import styles from "../styles.module.scss";

function GameMenu({ game, togglePrompt, isOwner }) {
  return (
    <>
      <div className={styles.controls}>
        <IoMdArrowRoundBack onClick={routeUser} />
        <LightMode inline={true} />
        {game.isJoinable ? (
          <BsFillUnlockFill style={{ opacity: isOwner ? 1 : 0.5 }} />
        ) : (
          <BsFillLockFill style={{ opacity: isOwner ? 1 : 0.5 }} />
        )}
        {isOwner && <FaUserPlus onClick={togglePrompt} />}
      </div>
      <h2>{game.name}</h2>
    </>
  );
}

export default GameMenu;
