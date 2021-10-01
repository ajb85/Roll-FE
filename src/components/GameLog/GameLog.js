import { useRef, useEffect } from "react";
import Die from "components/Die/";

import styles from "./GameLog.module.scss";

export default function GameLog(props) {
  const { logs, scores } = props.game;
  const scrollPlaceHolder = useRef();

  useEffect(() => {
    scrollPlaceHolder.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div>
      <h3>History</h3>
      <div className={styles.logs}>
        {logs?.map((l) => {
          const username = scores?.[l.user_id]?.username || "Player";
          return (
            <div className={styles.log} key={l.id}>
              <span>
                {username} played {l.value.category} for {l.value.score}pts
              </span>
              <div className={styles.dice}>
                {l.value.dice.map((dieFace, i) => (
                  <Die key={i} face={dieFace} size="small" />
                ))}
              </div>
              <div ref={scrollPlaceHolder} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
