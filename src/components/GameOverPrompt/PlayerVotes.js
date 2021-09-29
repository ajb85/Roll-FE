import { useState, useCallback } from "react";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { useGames } from "hooks";
import { combineClasses } from "js/utility";

import styles from "./GameOverPrompt.module.scss";

const voteStyles = {
  true: styles.yes,
  false: styles.no,
  undefined: styles.unknown,
};

const voteIcons = {
  true: IoMdCheckmarkCircleOutline,
  false: IoMdCloseCircleOutline,
  undefined: AiOutlineQuestionCircle,
};

export default function PlayerVotes(props) {
  const { voteForRecreate } = useGames();
  const [confirmed, setConfirmed] = useState(false);

  const confirm = useCallback(() => setConfirmed(true), [setConfirmed]);

  const voteYes = useCallback(
    () => voteForRecreate(props.game.game_id, true),
    [voteForRecreate, props.game.game_id]
  );

  const voteNo = useCallback(
    () => voteForRecreate(props.game.game_id, false),
    [voteForRecreate, props.game.game_id]
  );

  return (
    <div className={styles.playerVotes}>
      <div className={styles.playerWrapper}>
        {Object.keys(props.game.scores).map((userId) => {
          const { vote } = props.game.votes[userId] || {};
          const Icon = voteIcons[vote];
          return (
            <div key={userId} className={combineClasses(styles.player, voteStyles[vote])}>
              <span>{props.game.scores[userId].username}</span>
              <Icon />
            </div>
          );
        })}
      </div>
      <div className={styles.buttonsWrapper}>
        <button type="button" className={styles.yes} onClick={voteYes}>
          Play Again <IoMdCheckmarkCircleOutline />
        </button>
        <button type="button" className={styles.no} onClick={confirmed ? voteNo : confirm}>
          {confirmed ? "Are you sure?" : "Quit "}
          {!confirmed && <IoMdCloseCircleOutline />}
        </button>
      </div>
    </div>
  );
}
