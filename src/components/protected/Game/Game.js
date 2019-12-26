import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ScoreTable from './helpers/ScoreTable.js';
import Dice from './helpers/Dice.js';
import GameMenu from './helpers/GameMenu.js';
import Players from './helpers/Players.js';
import PlayButtons from './helpers/PlayButtons.js';
import Prompt from 'components/UI/Prompt/';
import LoadingDice from 'components/UI/LoadingDice/';

import { submitScore } from 'reducers/games.js';
import { showHeader, hideHeader } from 'reducers/app.js';
import { isUsersTurn } from 'js/rounds.js';
import history from 'history.js';

import styles from './styles.module.scss';

function Game(props) {
  const dispatch = useDispatch();
  const { user_id, gamesWereFetched, games, error } = useSelector(state => ({
    // isLoading: state.app.isLoading,
    user_id: state.account.id,
    gamesWereFetched: state.games.wereFetched,
    games: state.games.active,
    error: state.app.errors.play
  }));

  const [isLoading, setIsLoading] = useState(false);
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
    return <LoadingDice />;
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
          Send this link to a friend, which will automatically enter them in the
          game (bypassing the password):
          <br />
          <br />
          {link}
        </Prompt>
      )}
      <GameMenu game={game} togglePrompt={togglePrompt} isOwner={isOwner} />
      <p onClick={() => setIsLoading(!isLoading)}>Loading</p>
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
        <PlayButtons
          game_id={game.game_id}
          locked={locked}
          isLoading={isLoading}
          endRound={endRound}
          turns={turns}
          selected={selected}
          isTurn={isTurn}
        />
      )}
      <p className={styles.error}>{error}</p>
    </div>
  );
}

export default Game;
