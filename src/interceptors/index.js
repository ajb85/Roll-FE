import axios from 'axios';
import store from '../store.js';
import Sockets from 'sockets/';
import { success, failure } from './responses.js';
import { loading } from '../reducers/app.js';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

axios.interceptors.request.use(req => {
  store.dispatch(loading());
  const state = store.getState();
  const token = state.account.token;
  if (token) {
    Sockets.emit('identify', token);
    req.headers.authorization = token;
  }
  return req;
});

axios.interceptors.response.use(success, failure);
