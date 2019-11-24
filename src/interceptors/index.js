import axios from 'axios';
import store from '../store.js';
import Sockets from 'sockets/';
import { success, failure } from './responses.js';
import { loading } from '../reducers/app.js';
import { populateAccount } from '../reducers/account.js';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

axios.interceptors.request.use(req => {
  store.dispatch(loading());
  const state = store.getState();
  const token = state.account.token;

  if (token) {
    Sockets.emit('identify', token);
    req.headers.authorization = token;
  }

  if (!state.account.id && !(req.url === '/auth' && req.method === 'get')) {
    // Get account info if not found in state
    store.dispatch(populateAccount());
  }
  return req;
});

axios.interceptors.response.use(success, failure);
