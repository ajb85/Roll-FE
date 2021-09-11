import React, { Fragment } from "react";

import { combineClasses } from "js/utility";
import { useScreenSize } from "hooks";

import styles from "./Game.module.scss";

function Players({ game, viewPlayer, viewingPlayer }) {
  const { scores, currentRound, highScore } = game;
  const { isMobile } = useScreenSize();
  const users = Object.entries(scores).map(mapUserToScore).sort(sortByTotal);

  return (
    <div className={isMobile ? styles.playersMobile : styles.players}>
      <p className={styles.label}>Players{isMobile ? ":" : ""}</p>
      <div className={isMobile ? styles.noFlex : styles.flexColumn}>
        {users.map((u, i) => (
          <Fragment key={u.id}>
            <p
              data-player={u.id}
              onClick={viewPlayer}
              className={combineClasses(
                u.grandTotal >= highScore && styles.highlight,
                viewingPlayer === u.id && styles.viewing,
                u.round > currentRound && styles.greyOut
              )}
            >
              {u.username} ({u.round}-{u.grandTotal || 0})
            </p>
            {isMobile && i < users.length - 1 && <span>,</span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Players);

function sortByTotal(a, b) {
  if (a.round !== b.round) {
    return a.round < b.round ? -1 : 1;
  }

  return a.grandTotal < b.grandTotal ? 1 : -1;
}

function mapUserToScore([id, userScore]) {
  return {
    id: parseInt(id, 10),
    username: userScore.username,
    grandTotal: userScore.score["Grand Total"],
    round: userScore.round,
  };
}
