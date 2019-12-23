import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ScoreTable from './helpers/ScoreTable.js';
import Dice from './helpers/Dice.js';
import GameMenu from './helpers/GameMenu.js';

import { rollTheDice, submitScore } from 'reducers/games.js';
import { showHeader, hideHeader } from 'reducers/app.js';

import { isUsersTurn } from 'js/rounds.js';
import history from 'history.js';

import styles from './styles.module.scss';

function Game(props) {
  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [selected, setSelected] = useState(null);
  const [isTurn, setIsTurn] = useState(false);

  const dispatch = useDispatch();
  const { user_id, gamesWereFetched, games, error } = useSelector(state => ({
    user_id: state.account.id,
    gamesWereFetched: state.games.wereFetched,
    games: state.games.active,
    error: state.app.errors.play
  }));

  const params = useParams();
  const game = games.find(g => g.name === params.name);

  useEffect(() => {
    if (game && user_id) {
      setIsTurn(isUsersTurn(game.scores, user_id));
    }
  }, [game, user_id]);

  const toggleLockOnDie = index => {
    setLocked(locked.map((d, i) => (i === index ? !d : d)));
  };

  const toggleSelected = e => {
    setSelected(e.target.id === selected ? null : e.target.id);
  };

  const endRound = () => {
    dispatch(submitScore(game.game_id, selected));
    setSelected(null);
    setLocked([false, false, false, false, false]);
  };

  const turns = game && game.rolls ? 3 - game.rolls.length : 3;

  const dice =
    game && game.rolls && game.rolls.length
      ? game.rolls[game.rolls.length - 1]
      : [];

  useEffect(() => {
    dispatch(hideHeader());
    return () => dispatch(showHeader());
  }, [hideHeader, showHeader]);

  if (!gamesWereFetched) {
    // Loading state
    return <p className={styles.error}>Loading...</p>;
  }

  if (!game) {
    // Wrong URL state
    return (
      <>
        <p className={styles.error}>You are not in this game</p>
        <p onClick={() => history.push('/')} className={styles.error}>
          Back To Lobby
        </p>
      </>
    );
  }

  return (
    <div className={styles.Game}>
      <GameMenu game={game} />
      <ScoreTable
        game={game}
        selected={selected}
        toggleSelected={toggleSelected}
        isTurn={isTurn}
      />
      <Dice dice={dice} toggleLockOnDie={toggleLockOnDie} locked={locked} />
      {game.isActive && (
        // Buttons hide when the game is complete
        <section className={styles.buttons}>
          <img
            onClick={() => dispatch(rollTheDice(game.game_id, locked))}
            src={require(`../../../img/roll${turns}.png`)}
            alt={`Roll the dice. ${turns || 0} rolls left`}
            style={{
              opacity:
                isTurn && (!game.rolls || game.rolls.length < 3) ? 1 : 0.5
            }}
          />
          <img
            onClick={() => {
              endRound();
            }}
            src={require('../../../img/submit.png')}
            alt={`Submit turn`}
            style={{ opacity: selected && isTurn ? 1 : 0.5 }}
          />
        </section>
      )}
      <p className={styles.error}>{error}</p>
    </div>
  );
}

export default Game;
