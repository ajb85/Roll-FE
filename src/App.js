import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Account from './components/Account/';
import LoggedInRoutes from './components/Routes/';
import LightMode from './components/UI/LightMode/';

import { setToken } from 'reducers/account.js';

import styles from './styles.module.scss';
import { AppContainer } from 'Styles.js';

import { colorContext } from 'js/Colors.js';

function App(props) {
  const { colors } = useContext(colorContext);

  return (
    <AppContainer
      colors={colors || { primary: '', secondary: '', highlight: '' }}
    >
      <div className={styles.App}>
        {props.showHeader && <LightMode />}
        {props.showHeader && <h1>Roll!</h1>}
        <Route path="/" component={props.token ? LoggedInRoutes : Account} />
        {props.token && props.showHeader && (
          <button className={styles.logout} onClick={() => props.setToken()}>
            Logout
          </button>
        )}
      </div>
    </AppContainer>
  );
}

const mapStateToProps = state => ({
  token: state.account.token,
  showHeader: state.app.showHeader
});

export default connect(mapStateToProps, { setToken })(App);
