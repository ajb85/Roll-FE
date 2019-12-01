import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';

import Login from './helpers/Login.js';
import Register from './helpers/Register.js';

import { authAccount } from 'reducers/account.js';
import { Slider } from './Styles.js';
import styles from './styles.module.scss';

import { colorContext } from 'js/Colors.js';

function Account(props) {
  const [isRegistering, setIsRegistering] = useState(null);
  const { authAccount } = props;
  const formState = useState({ username: '', password: '', email: '' });
  const { colors, switchMode } = useContext(colorContext);

  return (
    <section className={styles.Account}>
      <div className={styles.container}>
        <Slider
          isRegistering={isRegistering}
          className={styles.slider}
          // style={{
          //   left: isRegistering ? '0px' : '492px'
          // }}
        >
          <Login
            state={formState}
            authAccount={authAccount}
            colors={colors}
            setIsRegistering={setIsRegistering}
          />
          <Register
            state={formState}
            authAccount={authAccount}
            colors={colors}
            setIsRegistering={setIsRegistering}
          />
        </Slider>
      </div>
      <div className={styles.darkMode} onClick={() => switchMode()}>
        <p>Switch to {colors.mode === 'dark' ? 'light' : 'dark'} mode.</p>
      </div>
    </section>
  );
}

export default connect(null, { authAccount })(Account);
