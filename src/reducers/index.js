import { combineReducers } from 'redux';
import account from './account.js';
import app from './app.js';

export default combineReducers({
  app,
  account
});
