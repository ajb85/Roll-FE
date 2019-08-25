const initialState = {
  id: '',
  username: '',
  email: '',
  wins: 0,
  losses: 0,
  token: localStorage.getItem('token'),
  loading: false
};

const ACCOUNT_IS_LOADING = 'ACCOUNT_IS_LOADING';
const SET_TOKEN = 'SET_TOKEN';
const DONE_LOADING = 'DONE_LOADING';
const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_IS_LOADING:
      return { ...state, loading: true };
    case DONE_LOADING:
      return { ...state, loading: false };
    case SET_ACCOUNT_INFO:
      return { ...state, ...action.payload, loading: false };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export const saveAccountInfo = accountInfo => {
  console.log('accountInfo', accountInfo);
  return { type: SET_ACCOUNT_INFO, payload: accountInfo };
};

export const setToken = payload => {
  payload
    ? localStorage.setItem('token', payload)
    : localStorage.removeItem('token');
  return { type: SET_TOKEN, payload };
};
