import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Account from "containers/Account";
import PlayGame from "containers/Game/";
import JoinFromLink from "containers/JoinFromLink";
import NewGame from "containers/CreateGame";
import GameList from "containers/GameList/";
import LoadingDice from "components/LoadingDice/";

import Header from "components/Header";
import FetchActiveGame from "components/Fetchers/ActiveGame.js";
import AllGames from "components/Fetchers/AllGames.js";

import { useToken } from "hooks/";
import { combineClasses } from "js/utility";

import styles from "./styles.module.scss";

export default function App(props) {
  const { token, tokenIsValidated } = useToken();

  if (token && !tokenIsValidated) {
    return (
      <div className={combineClasses(styles.LoadingApp, styles.App)}>
        <LoadingDice />
        <p>Verifying Account</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.appBodyWrapper}>
        <Switch>
          {!token && (
            <Route path="/register">
              <Account />
            </Route>
          )}

          {!token && (
            <Route path="/login">
              <Account />
            </Route>
          )}

          {token && (
            <Route path="/game/create">
              <NewGame />
            </Route>
          )}

          {token && (
            <Route path="/game/join">
              <NewGame />
            </Route>
          )}

          {token && (
            <Route path="/" exact>
              <AllGames />
              <GameList />
            </Route>
          )}

          {token && (
            <Route path="/game/play/:game_id">
              <FetchActiveGame />
              <PlayGame />
            </Route>
          )}

          <Route path="/j/:uuid">
            <JoinFromLink />
            {!token && <Redirect to="/register" />}
          </Route>

          <Route path="/">
            <Redirect to={token ? "/" : "/login"} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
