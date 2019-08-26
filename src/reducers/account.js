import axios from 'axios';

const initialState = {
  id: '',
  username: '',
  email: '',
  wins: 0,
  losses: 0,
  games: [],
  token: localStorage.getItem('token'),
  isLoading: false
};

const IS_FETCHING = 'ACCOUNT_FETCHING';
const SET_TOKEN = 'SET_TOKEN';
const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
const SET_GAMES = 'SET_GAMES';

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, isLoading: true };
    case SET_ACCOUNT_INFO:
      return { ...state, ...action.payload, isLoading: false };
    case SET_TOKEN:
      return { ...state, token: action.payload, isLoading: false };
    case SET_GAMES:
      return { ...state, games: action.payload, isLoading: false };

    default:
      return state;
  }
};

export const loading = () => ({ type: IS_FETCHING });

export const saveAccountInfo = accountInfo => {
  return { type: SET_ACCOUNT_INFO, payload: accountInfo };
};

export const setToken = payload => {
  payload
    ? localStorage.setItem('token', payload)
    : localStorage.removeItem('token');
  return { type: SET_TOKEN, payload };
};

export const getUsersGames = () => async dispatch => {
  dispatch({ type: IS_FETCHING });

  const games = await axios.get('/games/user');
  dispatch({ type: SET_GAMES, payload: games.data });
};
