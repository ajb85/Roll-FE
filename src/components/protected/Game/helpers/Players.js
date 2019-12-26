import React, { Fragment } from 'react';

import { colorContext } from 'js/Colors.js';
import styles from '../styles.module.scss';

function Players({ localReducer: [{ game }, localDispatch] }) {
  const { colors } = React.useContext(colorContext);
  const users = Object.keys(game.scores)
    .map(id => ({
      id: parseInt(id, 10),
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
          <Fragment key={u.id}>
            <p
              onClick={() => localDispatch({ type: 'SET_VIEW', payload: u.id })}
              style={{
                color:
                  i === 0 || u.grandTotal === users[0].grandTotal
                    ? colors.highlight
                    : null
              }}
            >
              {u.username} ({u.grandTotal || 0})
            </p>
            {i < users.length - 1 && <span>,</span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Players;
