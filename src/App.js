import React from 'react';
import { connect } from 'react-redux';

import Account from './components/Account/';
import Routes from './components/Routes/';
import { setToken } from 'reducers/account.js';

function App(props) {
  return (
    <div className="App">
      <h1>Roll</h1>
      {props.token ? <Routes /> : <Account />}
      <button onClick={() => props.setToken()}>Logout</button>
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
