import React, { useReducer, useEffect } from 'react';
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

import { initialState, reducer } from './reducer/';
import { submitScore } from 'reducers/games.js';
import { showHeader, hideHeader } from 'reducers/app.js';
import { populateAccount } from 'reducers/account.js';
import history from 'history.js';

import styles from './styles.module.scss';

function Game(props) {
  const { user_id, gamesWereFetched, games, error, isLoading } = useSelector(
    state => ({
      user_id: state.account.id,
      gamesWereFetched: state.games.wereFetched,
      games: state.games.active,
      isLoading: state.app.isLoading,
      error: state.app.errors.play
    })
  );

  const dispatch = useDispatch();

  const localReducer = useReducer(reducer, initialState);
  const [localState, localDispatch] = localReducer;

  const isViewingSelf = localState.viewing === user_id;

  const { game_id } = useParams();

  useEffect(() => {
    if (!user_id) {
      dispatch(populateAccount());
    }
    localDispatch({ type: 'SET_VIEW', payload: user_id });
  }, [user_id, dispatch, localDispatch]);

  useEffect(() => {
    if (games && games.length && user_id) {
      const payload = games.find(
        g => parseInt(g.game_id, 10) === parseInt(game_id, 10)
      );
      if (payload && payload !== localState.game) {
        localDispatch({
          type: 'UPDATE_GAME',
          payload,
          user_id
        });
      }
    }
  }, [games, localState.game, user_id, game_id, localDispatch]);

  useEffect(() => {
    dispatch(hideHeader());
    return () => dispatch(showHeader());
  }, [dispatch]);

  const toggleSelected = e =>
    localDispatch({
      type: 'TOGGLE_SELECTED',
      payload: e.target.id
    });

  const endRound = () => {
    dispatch(submitScore(localState.game.game_id, localState.selected));
    localDispatch({ type: 'ROUND_RESET' });
  };

  if (!gamesWereFetched) {
    // Loading state
    return (
      <div style={{ paddingTop: '50px' }}>
        <LoadingDice />
        <p style={{ textAlign: 'center', marginTop: '25px' }}>Loading Game</p>
      </div>
    );
  }

  if (!localState.game) {
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

  const isOwner = parseInt(localState.game.owner) === parseInt(user_id);

  const promptOn = () => {
    if (isOwner) {
      localDispatch({ type: 'ENABLE_PROMPT' });
      axios.get(`/games/invite/create/${localState.game.game_id}`).then(res => {
        const { uuid } = res.data;
        localDispatch({
          type: 'UPDATE_LINK',
          payload: `${window.location.protocol}//${window.location.host}/j/${uuid}`
        });
      });
    }
  };

  const togglePrompt = () => {
    if (localState.showPrompt) {
      localDispatch({ type: 'PROMPT_OFF' });
    } else {
      promptOn();
    }
  };

  return (
    <div className={styles.Game}>
      {localState.showPrompt && (
        <Prompt
          copy={true}
          cancel={() => localDispatch({ type: 'PROMPT_OFF' })}
          textToCopy={localState.link}
        >
          Send this link to a friend, which will automatically enter them in the
          game (bypassing the password):
          <br />
          <br />
          {localState.link}
        </Prompt>
      )}
      <GameMenu
        game={localState.game}
        togglePrompt={togglePrompt}
        isOwner={isOwner}
      />
      <Players localReducer={localReducer} />
      <ScoreTable localState={localState} toggleSelected={toggleSelected} />
      {localState.game.isActive > 0 && isViewingSelf && (
        // Dice hide when the game is complete
        <Dice
          toggleLockOnDie={payload =>
            localDispatch({ type: 'LOCK_DIE', payload })
          }
          localState={localState}
        />
      )}
      {localState.game.isActive > 0 && isViewingSelf && (
        // Buttons hide when the game is complete
        <PlayButtons
          endRound={endRound}
          localState={localState}
          isLoading={isLoading}
        />
      )}
      <p className={styles.error}>{error}</p>
    </div>
  );
}

export default Game;
