import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import history from 'history.js';
import { getUsersGames } from 'reducers/account.js';
import styles from './styles.module.scss';

function Game(props) {
  const { getUsersGames, games, gamesWereFetched } = props;

  useEffect(() => {
    getUsersGames();
  }, [getUsersGames]);

  const { name } = props.match.params;
  const game = games.find(g => g.name === name);

  if (!gamesWereFetched) {
    return <p className={styles.error}>Loading...</p>;
  }

  if (props.gamesWereFetched && !game) {
    setTimeout(() => history.push('/'), 1500);
    return <p className={styles.error}>You are not in this game</p>;
  }

  return <div>{game.name}</div>;
}

const mapStateToProps = state => ({
  games: state.account.games,
  gamesWereFetched: state.account.gamesWereFetched
});

export default connect(
  mapStateToProps,
  { getUsersGames }
)(Game);
