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
      <h1>Roll!</h1>
      <Route path="/" component={props.token ? LoggedInRoutes : Account} />
      {props.token && (
        <button className={styles.logout} onClick={() => props.setToken()}>
          Logout
        </button>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  token: state.account.token
});

export default connect(
  mapStateToProps,
  { setToken }
)(App);
