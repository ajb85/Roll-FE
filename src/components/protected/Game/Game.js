import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ScoreTable from './helpers/ScoreTable.js';
import Dice from './helpers/Dice.js';
import GameMenu from './helpers/GameMenu.js';
import Players from './helpers/Players.js';
import Prompt from 'components/UI/Prompt/';

import { rollTheDice, submitScore } from 'reducers/games.js';
import { showHeader, hideHeader } from 'reducers/app.js';

import { isUsersTurn } from 'js/rounds.js';
import history from 'history.js';

import styles from './styles.module.scss';

function Game(props) {
  const dispatch = useDispatch();
  const { user_id, gamesWereFetched, games, error } = useSelector(state => ({
    user_id: state.account.id,
    gamesWereFetched: state.games.wereFetched,
    games: state.games.active,
    error: state.app.errors.play
  }));

  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [selected, setSelected] = useState(null);
  const [isTurn, setIsTurn] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const initialLinkText = 'Generating link...';
  const [link, setLink] = useState(initialLinkText);
  const [viewing, setViewing] = useState(user_id);
  const isViewingSelf = viewing === user_id;
  const params = useParams();
  const game = games.find(
    g => parseInt(g.game_id, 10) === parseInt(params.game_id, 10)
  );

  useEffect(() => {
    setViewing(user_id);
  }, [user_id, setViewing]);

  useEffect(() => {
    if (game && user_id) {
      setIsTurn(isUsersTurn(game.scores, user_id));
    }
  }, [game, user_id]);

  useEffect(() => {
    dispatch(hideHeader());
    return () => dispatch(showHeader());
  }, [dispatch]);

  const toggleLockOnDie = index =>
    setLocked(locked.map((d, i) => (i === index ? !d : d)));

  const toggleSelected = e =>
    setSelected(e.target.id === selected ? null : e.target.id);

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

  const isOwner = parseInt(game.owner) === parseInt(user_id);

  const promptOn = () => {
    if (isOwner) {
      axios.get(`/games/invite/create/${game.game_id}`).then(res => {
        if (res && res.data && res.data.uuid) {
          const { uuid } = res.data;
          setLink(
            `${window.location.protocol}//${window.location.host}/j/${uuid}`
          );
        } else {
          console.error('NO INVITE LINK: ', res);
        }
      });
      setShowPrompt(true);
    }
  };

  const promptOff = () => {
    setLink(initialLinkText);
    setShowPrompt(false);
  };

  const togglePrompt = () => {
    if (showPrompt) {
      promptOff();
    } else {
      promptOn();
    }
  };

  return (
    <div className={styles.Game}>
      {showPrompt && (
        <Prompt copy={true} cancel={promptOff} textToCopy={link}>
          <p>
            Send this link to a friend, which will automatically enter them in
            the game (bypassing the password):
          </p>
          <p>{link}</p>
        </Prompt>
      )}
      <GameMenu game={game} togglePrompt={togglePrompt} isOwner={isOwner} />
      <Players game={game} setViewing={setViewing} />
      <ScoreTable
        game={game}
        selected={selected}
        toggleSelected={toggleSelected}
        isTurn={isTurn}
        viewing={viewing}
      />
      {game.isActive > 0 && isViewingSelf && (
        // Dice hide when the game is complete
        <Dice
          dice={dice}
          toggleLockOnDie={toggleLockOnDie}
          locked={locked}
          isTurn={isTurn}
        />
      )}
      {game.isActive > 0 && isViewingSelf && (
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
