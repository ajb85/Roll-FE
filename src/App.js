import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Account from './components/Account/';
import LoggedInRoutes from './components/Routes/';
import { setToken } from 'reducers/account.js';

import styles from './styles.module.scss';

import io from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_API_URL);
socket.on('error', function(err) {
  console.log('received socket error:');
  console.log(err);
});

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
