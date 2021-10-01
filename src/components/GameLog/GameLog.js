import { useState, useRef, useEffect, useCallback } from "react";
import { GrEmoji } from "react-icons/gr";

import Die from "components/Die/";
import EmojiPrompt from "components/EmojiPrompt/";
import Tooltip from "components/Tooltip/";

import styles from "./GameLog.module.scss";
import { useAccount, useGames } from "hooks";
import { combineClasses } from "js/utility";

export default function GameLog(props) {
  const { logs, scores } = props.game;
  const { reactToLog } = useGames();
  const { user_id } = useAccount();
  const [emojiPrompt, setEmojiPrompt] = useState(null);
  const scrollPlaceHolder = useRef();

  useEffect(() => {
    scrollPlaceHolder.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const toggleEmojiPrompt = useCallback(
    (e) => {
      e.stopPropagation();
      let { target } = e;
      while (!target.dataset.hasOwnProperty("index")) {
        target = target.parentNode;
      }
      const index = Number(target.dataset.index);
      setEmojiPrompt(index === emojiPrompt ? null : index);
    },
    [emojiPrompt, setEmojiPrompt]
  );

  const closeEmoji = useCallback(() => {
    setEmojiPrompt(null);
  }, [setEmojiPrompt]);

  const handleEmojiClick = useCallback(
    (emoji, log_id) => {
      if (!log_id) {
        log_id = logs[emojiPrompt].id;
      }
      reactToLog(log_id, emoji);
      setEmojiPrompt(null);
    },
    [reactToLog, logs, emojiPrompt]
  );

  return (
    <div className={styles.logsWrapper}>
      <h3>History</h3>
      <div className={styles.logs}>
        {logs?.map((l, index) => {
          const username = scores?.[l.user_id]?.username || "Player";
          return (
            <div
              className={combineClasses(styles.log, emojiPrompt === index && styles.selected)}
              key={l.id}
            >
              <div>
                <span>
                  {username} played {l.value.category} for {l.value.score}pts
                </span>
                <div className={styles.dice}>
                  {l.value.dice.map((dieFace, i) => (
                    <Die key={i} face={dieFace} size="small" />
                  ))}
                </div>
                {!!l.reactions?.length && (
                  <div className={styles.reactionEmojisWrapper}>
                    {l.reactions.map(({ reaction, users }) => {
                      const spanID = `id${l.id}${reaction.unified}`;
                      const userVoted = users.find((u) => u.user_id === user_id);
                      return (
                        <>
                          <div
                            className={combineClasses(
                              styles.reactionEmoji,
                              userVoted && styles.userVoted
                            )}
                            id={spanID}
                            onClick={handleEmojiClick.bind(this, reaction, l.id)}
                          >
                            <span role="img" aria-label={reaction.names[0]}>
                              {reaction.emoji} {users.length}
                            </span>
                            <Tooltip target={spanID}>
                              {users.map(({ username }) => username).join(", ")}
                            </Tooltip>
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className={styles.emoji} data-index={index} onClick={toggleEmojiPrompt}>
                <div>
                  <GrEmoji />
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollPlaceHolder} />
      </div>
      <EmojiPrompt isOpen={emojiPrompt !== null} close={closeEmoji} onChange={handleEmojiClick} />
    </div>
  );
}
