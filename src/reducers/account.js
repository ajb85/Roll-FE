import axios from 'axios';
import history from 'history.js';

const initialState = {
  id: '',
  username: '',
  email: '',
  wins: 0,
  losses: 0,
  games: [],
  token: localStorage.getItem('token')
};

const SET_TOKEN = 'SET_TOKEN';
const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
const SET_GAMES = 'SET_GAMES';
const NEW_GAME = 'NEW_GAME';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return { ...state, ...action.payload, isLoading: false };
    case SET_TOKEN:
      return { ...state, token: action.payload, isLoading: false };
    case SET_GAMES:
      return { ...state, games: action.payload, isLoading: false };
    case NEW_GAME:
      return { ...state, games: [...state.games, action.payload] };

    default:
      return state;
  }
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
  dispatch({ type: SET_GAMES, payload: games.data });
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
    history.push('/');
  }
};
