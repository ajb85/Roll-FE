import store from '../store.js';
import history from 'history.js';
import { setToken } from 'reducers/account.js';
import { doneLoading, clearErrors } from 'reducers/app.js';
import { logError } from 'reducers/app.js';

export function success(res) {
  store.dispatch(doneLoading());

  // May have to update to accept requestTypes for
  // specific successful actions and clear that section
  store.dispatch(clearErrors());
  if (res.data.token) {
    const { token, ...account } = res.data;
    res.data = account;
    store.dispatch(setToken(token));
  }
  return res;
}

export function failure(error) {
  // const errorList = loadDirectory('./errors/');
  store.dispatch(doneLoading());

  const { response: res } = error;

  handleError(error);

  if (res && res.status === 404) {
    history.push('/');
  }
}

function isHandlerEnabled(config = {}) {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled
    ? false
    : true;
}

function handleError(error) {
  const { response: res } = error;

  if (res && res.data.requestType) {
    const { response: res } = error;
    store.dispatch(logError(res.data.requestType, res.data.message));
  } else if (res && res.status === 401) {
    store.dispatch(setToken(null));
  } else if (isHandlerEnabled(error.config)) {
    console.error('config', error.config);
  } else {
    console.error('NO CONFIG: ', error);
  }
}
