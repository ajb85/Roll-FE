import React, { Fragment } from "react";

import useColorMode from "hooks/useColorMode.js";

import styles from "./Game.module.scss";

function Players({ scores, viewPlayer }) {
  const { colors } = useColorMode();
  const users = Object.entries(scores).map(mapUserToScore).sort(sortByGrandTotal);

  return (
    <div className={styles.players}>
      <p className={styles.label}>Players:</p>
      <div>
        {users.map((u, i) => (
          <Fragment key={u.id}>
            <p
              data-player={u.id}
              onClick={viewPlayer}
              style={{
                color: i === 0 || u.grandTotal === users[0].grandTotal ? colors.highlight : null,
              }}
            >
              {u.username} ({u.round}-{u.grandTotal || 0})
            </p>
            {i < users.length - 1 && <span>,</span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Players);

function sortByGrandTotal(a, b) {
  return a.grandTotal === b.grandTotal ? 0 : a.grandTotal > b.grandTotal ? -1 : 1;
}

function mapUserToScore([id, userScore]) {
  return {
    id: parseInt(id, 10),
    username: userScore.username,
    grandTotal: userScore.score["Grand Total"],
    round: userScore.round,
  };
}
