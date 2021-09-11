import { memo } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgUserList } from "react-icons/cg";
import { GiRollingDices } from "react-icons/gi";

import { useScreenSize } from "hooks";

import styles from "./GameTitle.module.scss";

export default memo(function GameTitle(props) {
  const { isDesktop } = useScreenSize();
  return (
    <div className={styles.title}>
      <h2>Game: {props.game.name}</h2>
      <div className={styles.buttonGroup}>
        {!isDesktop &&
          (props.menu === "game" ? (
            <CgUserList onClick={props.toggleMenu} />
          ) : (
            <GiRollingDices onClick={props.toggleMenu} />
          ))}
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
