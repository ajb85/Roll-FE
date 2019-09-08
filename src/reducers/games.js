import axios from 'axios';
import history from 'history.js';

const initialState = {
  active: [],
  wereFetched: false
};

const GETTING_GAMES = 'GETTING_GAMES';
const GOT_GAMES = 'GOT_GAMES';
const SET_GAMES = 'SET_GAMES';
const NEW_GAME = 'NEW_GAME';
const LEAVING_GAME = 'LEAVING_GAME';
const NEW_ROLL = 'NEW_ROLL';
const GAME_UPDATE = 'GAME_UPDATE';

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_GAMES:
      return { ...state, wereFetched: false };
    case GOT_GAMES:
      return { ...state, wereFetched: true };
    case SET_GAMES:
      return { ...state, active: action.payload, wereFetched: true };
    case NEW_GAME:
      return {
        ...state,
        active: [...state.active, action.payload],
        wereFetched: true
      };
    case LEAVING_GAME:
      return {
        ...state,
        active: state.active.filter(g => g.game_id !== action.payload),
        wereFetched: true
      };
    case NEW_ROLL:
      const { game_id, rolls } = action.payload;
      return {
        ...state,
        active: state.active.map(g => {
          if (g.game_id === game_id) {
            const newGame = { ...g, rolls };
            return newGame;
          }
          return g;
        })
      };
    case GAME_UPDATE:
      return {
        ...state,
        active: state.active.map(g => {
          if (g.game_id === action.payload.game_id) {
            return action.payload;
          } else return g;
        })
      };
    default:
      return state;
  }
};

export const gettingGames = () => {
  return { type: GETTING_GAMES };
};

export const gotGames = () => {
  return { type: GOT_GAMES };
};

export const getUsersGames = () => async dispatch => {
  dispatch({ type: GETTING_GAMES });
  const games = await axios.get('/games/user');
  if (games) {
    dispatch({ type: SET_GAMES, payload: games.data });
  }
};

export const createNewGame = form => async dispatch => {
  dispatch({ type: GETTING_GAMES });
  const newGame = await axios.post('games/user/create', form);
  if (newGame) {
    dispatch({ type: NEW_GAME, payload: newGame.data });
    history.push('/');
  }
};

export const joinGame = form => async dispatch => {
  dispatch({ type: GETTING_GAMES });
  const newGame = await axios.post(`games/user/join`, form);
  if (newGame) {
    dispatch({ type: NEW_GAME, payload: newGame.data });
    history.push(`/game/play/${newGame.name}`);
  }
};

export const leaveGame = game_id => async dispatch => {
  dispatch({ type: GETTING_GAMES });

  const leaving = await axios.post('games/user/leave', { game_id });

  if (leaving) {
    dispatch({ type: LEAVING_GAME, payload: game_id });
  }
};

export const rollTheDice = (game_id, locked) => async dispatch => {
  const newRoll = await axios.post(`/games/play/${game_id}/rollDice`, {
    locked
  });
  if (newRoll) {
    dispatch({ type: NEW_ROLL, payload: newRoll.data });
  }
};

export const submitScore = (game_id, category) => async dispatch => {
  const gameUpdate = await axios.post(`/games/play/${game_id}/submitRound`, {
    category
  });

  if (gameUpdate) {
    dispatch({ type: GAME_UPDATE, payload: gameUpdate.data });
  }
};
