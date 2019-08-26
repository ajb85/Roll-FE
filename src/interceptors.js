import axios from 'axios';
import store from './store.js';
import { setToken, saveAccountInfo, loading } from './reducers/account.js';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled
    ? false
    : true;
};

axios.interceptors.request.use(config => {
  store.dispatch(loading());
  const state = store.getState();
  const token = state.account.token;
  config.headers.authorization = token;
  return config;
});

axios.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

function successHandler(res) {
  if (res.data.token) {
    const { token, ...account } = res.data;
    store.dispatch(saveAccountInfo(account));
    store.dispatch(setToken(token));
  }

  return res;
}

function errorHandler(err) {
  console.log('ERROR: ', err);
  if (err.status === 401) {
    store.dispatch(setToken());
  } else if (isHandlerEnabled(err.config)) {
    console.log('config', err.config);
  } else {
    console.log('NO CONFIG: ', err);
  }
}
