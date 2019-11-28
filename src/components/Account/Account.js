import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';

import { authAccount } from 'reducers/account.js';
import styles from './styles.module.scss';

import { colorContext } from 'js/Colors.js';

function Account(props) {
  const [isRegistering, setIsRegistering] = useState(false);
  const { authAccount, isLoading } = props;
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const { colors, switchMode } = useContext(colorContext);
  const setState = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleClick = e => {
    const condition = {
      register: !isRegistering,
      login: isRegistering
    };
    if (condition[e.target.name]) {
      setIsRegistering(!isRegistering);
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    // const { username, password, email } = form;
    // authAccount(
    //   isRegistering
    //     ? { username, password, email }
    //     : { account: username, password }
    // );
  };

  return (
    <section className={styles.Account}>
      <form className={styles.standard} onSubmit={e => onSubmit(e)}>
        <div className={styles.inputs}>
          <p>
            {isRegistering
              ? 'Create a new account'
              : 'Log into existing account'}
          </p>
          <input
            name='username'
            type='text'
            value={form.username}
            onChange={e => setState(e)}
            autoComplete='username'
            autoFocus
            placeholder={isRegistering ? 'Username' : 'Account'}
          />
          {/* {isRegistering && ( */}
          <input
            name='email'
            type='email'
            value={form.email}
            onChange={e => setState(e)}
            autoComplete='email'
            placeholder='Email'
            style={{ display: isRegistering ? 'initial' : 'none' }}
          />

          <input
            name='password'
            type='password'
            value={form.password}
            onChange={e => setState(e)}
            autoComplete='current-password'
            placeholder='Password'
          />
        </div>
        <p className={styles.error}>
          {isRegistering ? props.registerError : props.loginError}
        </p>

        <div className={styles.buttons}>
          <button
            type={isRegistering ? 'button' : 'submit'}
            name='login'
            style={{
              backgroundColor: isRegistering
                ? colors.primary
                : colors.secondary,
              color: isRegistering ? colors.secondary : colors.primary
            }}
            onClick={e => handleClick(e)}
          >
            {isLoading ? '...Loading' : 'Login'}
          </button>
          <div
            className={styles.bubble}
            style={{
              width: '25px'
            }}
          >
            <div style={{ backgroundColor: colors.primary }} />
            <div style={{ backgroundColor: colors.primary }} />
            <p
              style={{
                color: colors.secondary,
                backgroundColor: colors.primary,
                border: `1px solid ${colors.secondary}`
              }}
            >
              OR
            </p>
          </div>
          <button
            type={isRegistering ? 'submit' : 'button'}
            name='register'
            style={{
              backgroundColor: isRegistering
                ? colors.secondary
                : colors.primary,
              color: isRegistering ? colors.primary : colors.secondary
            }}
            onClick={e => handleClick(e)}
          >
            {isLoading ? '...Loading' : 'Register'}
          </button>
        </div>
      </form>

      <div className={styles.darkMode} onClick={() => switchMode()}>
        <p>Switch to {colors.mode === 'dark' ? 'light' : 'dark'} mode.</p>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  loginError: state.app.errors.login,
  registerError: state.app.errors.register
});

export default connect(mapStateToProps, { authAccount })(Account);
