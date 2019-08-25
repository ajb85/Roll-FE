const initialState = {
  username: '',
  email: '',
  wins: 0,
  losses: 0,
  loading: false
};

const ACCOUNT_IS_LOADING = 'ACCOUNT_IS_LOADING';
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
    default:
      return state;
  }
};

export const getAccountInfo = () => {};
