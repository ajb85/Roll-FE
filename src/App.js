import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Account from './components/Account/';
import LoggedInRoutes from './components/Routes/';
import { setToken } from 'reducers/account.js';

import styles from './styles.module.scss';

function App(props) {
  return (
    <div className="App">
      {props.showHeader && <h1>Roll!</h1>}
      <Route path="/" component={props.token ? LoggedInRoutes : Account} />
      {props.token && props.showHeader && (
        <button className={styles.logout} onClick={() => props.setToken()}>
          Logout
        </button>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  token: state.account.token,
  showHeader: state.app.showHeader
});

export default connect(
  mapStateToProps,
  { setToken }
)(App);
