import { combineReducers } from "redux";
import app from "./app.js";
import account from "./account.js";
import games from "./games.js";

export default combineReducers({
  app,
  account,
  games,
});
