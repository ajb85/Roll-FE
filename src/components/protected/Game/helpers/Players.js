import React from 'react';

import { colorContext } from 'js/Colors.js';
import styles from '../styles.module.scss';

function Players({ game }) {
  const { colors } = React.useContext(colorContext);
  const users = Object.keys(game.scores)
    .map(id => ({
      username: game.scores[id].username,
      grandTotal: game.scores[id].score['Grand Total']
    }))
    .sort((a, b) =>
      a.grandTotal === b.grandTotal ? 0 : a.grandTotal > b.grandTotal ? -1 : 1
    );
  return (
    <div className={styles.players}>
      <p className={styles.label}>Players: </p>
      <div>
        {users.map((u, i) => (
          <>
            <p
              style={{
                color:
                  i === 0 || u.grandTotal === users[0].grandTotal
                    ? colors.highlight
                    : null
              }}
            >
              {u.username} ({u.grandTotal})
            </p>
            {i < users.length - 1 && <span>,</span>}
          </>
        ))}
      </div>
    </div>
  );
}

export default Players;
