import React, { useState, useContext } from 'react';
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
  const { colors } = useContext(colorContext);

  return (
    <section className={styles.Account}>
      <div className={styles.container}>
        <Slider
          isRegistering={isRegistering}
          className={styles.slider}
          style={{
            left: isRegistering ? '492px' : '0px'
          }}
        >
          <Register
            state={formState}
            authAccount={authAccount}
            colors={colors}
            setIsRegistering={setIsRegistering}
          />
          <Login
            state={formState}
            authAccount={authAccount}
            colors={colors}
            setIsRegistering={setIsRegistering}
          />
        </Slider>
      </div>
    </section>
  );
}

export default connect(null, { authAccount })(Account);
