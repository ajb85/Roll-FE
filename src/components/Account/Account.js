import React, { useState } from 'react';
import { connect } from 'react-redux';

import { authAccount } from 'reducers/account.js';
import styles from './styles.module.scss';

function Account(props) {
  const [isRegistering, setIsRegistering] = useState(false);
  const { authAccount, isLoading } = props;
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const setState = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const { username, password, email } = form;
    authAccount(
      isRegistering
        ? { username, password, email }
        : { account: username, password }
    );
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
          {/* )} */}
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
          <button type='submit'>{isRegistering ? 'Register' : 'Login'}</button>
          <p>OR</p>
          <button
            type='button'
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isLoading
              ? '...Loading'
              : isRegistering
              ? 'Login to Account'
              : 'Create Account'}
          </button>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  loginError: state.app.errors.login,
  registerError: state.app.errors.register
});

export default connect(mapStateToProps, { authAccount })(Account);
