import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Account from "./components/Account/";
import LoggedInRoutes from "./components/Routes/";
import Header from "./components/Header";

import useColorMode from "hooks/useColorMode.js";
import { logout } from "reducers/account.js";
import sockets from "sockets/";

import styles from "./styles.module.scss";
import { AppContainer } from "Styles.js";

function App(props) {
  const { colors } = useColorMode();

  return (
    <AppContainer
      colors={colors || { primary: "", secondary: "", highlight: "" }}
    >
      <div className={styles.App}>
        <Header />
        <Route path="/" component={props.token ? LoggedInRoutes : Account} />
      </div>
    </AppContainer>
  );
}

const mapStateToProps = (state) => ({
  token: state.account.token,
  showHeader: state.app.showHeader,
});

export default connect(mapStateToProps, { logout })(App);
