import React from "react";

import { combineClasses } from "js/utility";
import { useScreenSize, useViewingPlayer } from "hooks";

import styles from "./PlayerList.module.scss";

function PlayerList({ game }) {
  const { scores, currentRound, highScore } = game;
  const { viewingPlayer, setViewingPlayer } = useViewingPlayer();
  const { isDesktop } = useScreenSize();
  const users = Object.entries(scores).map(mapUserToScore).sort(sortByTotal);

  return (
    <div className={isDesktop ? styles.players : styles.playersMobile}>
      <p className={styles.label}>Players</p>
      <div className={styles.flexColumn}>
        {users.map((u, i) => (
          <p
            key={u.id}
            data-player={u.id}
            onClick={setViewingPlayer}
            className={combineClasses(
              u.grandTotal >= highScore && styles.highlight,
              viewingPlayer === u.id && styles.viewing,
              u.round > currentRound && styles.greyOut
            )}
          >
            {u.username} ({u.round}-{u.grandTotal || 0})
          </p>
        ))}
      </div>
    </div>
  );
}

export default React.memo(PlayerList);

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