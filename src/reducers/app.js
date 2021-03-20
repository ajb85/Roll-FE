const noErrors = { login: '', register: '', game: '', play: '' };
const initialState = {
  isLoading: false,
  errors: noErrors,
  showHeader: true
};

const IS_FETCHING = 'FETCHING';
const FETCHED = 'FETCHED';
const LOG_ERROR = 'LOG_ERROR';
const CLEAR_ERRORS = 'CLEAR_ERRORS';
const HIDE_HEADER = 'HIDE_HEADER';
const SHOW_HEADER = 'SHOW_HEADER';

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, isLoading: true };
    case FETCHED:
      return { ...state, isLoading: false };
    case LOG_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.location]: action.payload.message
        }
      };
    case CLEAR_ERRORS:
      return { ...state, errors: noErrors };
    case HIDE_HEADER:
      return { ...state, showHeader: false };
    case SHOW_HEADER:
      return { ...state, showHeader: true };

    default:
      return state;
  }
};

export const loading = () => ({ type: IS_FETCHING });
export const doneLoading = () => ({ type: FETCHED });

export const logError = (location, message) => dispatch => {
  console.log(location, message);
  dispatch({ type: LOG_ERROR, payload: { location, message } });
};
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export const showHeader = () => {
  return { type: SHOW_HEADER };
};

export const hideHeader = () => {
  return { type: HIDE_HEADER };
};
