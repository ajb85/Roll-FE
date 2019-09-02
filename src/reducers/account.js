import axios from 'axios';
import history from 'history.js';

const initialState = {
  id: '',
  username: '',
  email: '',
  wins: 0,
  losses: 0,
  games: [],
  token: localStorage.getItem('token'),
  gamesWereFetched: false
};

const SET_TOKEN = 'SET_TOKEN';
const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
const SET_GAMES = 'SET_GAMES';
const NEW_GAME = 'NEW_GAME';
const GETTING_GAMES = 'GETTING_GAMES';
const LEAVING_GAME = 'LEAVING_GAME';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return { ...state, ...action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_GAMES:
      return { ...state, games: action.payload, gamesWereFetched: true };
    case NEW_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
        gamesWereFetched: true
      };
    case GETTING_GAMES:
      return { ...state, gamesWereFetched: false };
    case LEAVING_GAME:
      return {
        ...state,
        games: state.games.filter(g => g.game_id !== action.payload)
      };
    default:
      return state;
  }
};

export const gettingGames = () => {
  return { type: GETTING_GAMES };
};

export const authAccount = form => async dispatch => {
  const accountInfo = await axios.post('/auth', form);
  if (accountInfo) {
    dispatch({ type: SET_ACCOUNT_INFO, payload: accountInfo.data });
  }
};
export const setToken = payload => {
  payload
    ? localStorage.setItem('token', payload)
    : localStorage.removeItem('token');
  return { type: SET_TOKEN, payload };
};

export const getUsersGames = () => async dispatch => {
  const games = await axios.get('/games/user');
  if (games) {
    dispatch({ type: SET_GAMES, payload: games.data });
  }
};

export const createNewGame = form => async dispatch => {
  const newGame = await axios.post('games/user/create', form);
  if (newGame) {
    dispatch({ type: NEW_GAME, payload: newGame.data });
    history.push('/');
  }
};

export const joinGame = form => async dispatch => {
  const newGame = await axios.post(`games/user/join`, form);
  if (newGame) {
    dispatch({ type: NEW_GAME, payload: newGame.data });
    history.push(`/game/play/${newGame.name}`);
  }
};

export const leaveGame = game_id => async dispatch => {
  console.log('LEAVING: ', game_id);
  const leaving = await axios.post('games/user/leave', { game_id });

  if (leaving) {
    dispatch({ type: LEAVING_GAME, payload: game_id });
  }
};
