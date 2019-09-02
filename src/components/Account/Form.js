import React, { useState } from 'react';
import { connect } from 'react-redux';

import { authAccount } from 'reducers/account.js';
import styles from './styles.module.scss';

function Register(props) {
  const { isRegistering, authAccount, isLoading } = props;
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const setState = e => setForm({ ...form, [e.target.name]: e.target.value });

  // React.useEffect(() => {
  // Reset form when user toggles between tabs
  //   setForm({ username: '', password: '', email: '' });
  // }, [isRegistering, setForm]);
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
    <form className={styles.standard} onSubmit={e => onSubmit(e)}>
      <div>
        <input
          name="username"
          type="text"
          value={form.username}
          onChange={e => setState(e)}
          autoComplete="username"
          autoFocus
          placeholder={isRegistering ? 'Username' : 'Account'}
        />
      </div>
      {isRegistering && (
        <div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={e => setState(e)}
            autoComplete="email"
            placeholder="Email"
          />
        </div>
      )}
      <div>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={e => setState(e)}
          autoComplete="current-password"
          placeholder="Password"
        />
      </div>
      <p className={styles.error}>
        {isRegistering ? props.registerError : props.loginError}
      </p>
      <button type="submit" disabled={isLoading}>
        {isLoading
          ? 'Loading'
          : isRegistering
          ? 'Register Account'
          : 'Login To Account'}
      </button>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  loginError: state.app.errors.login,
  registerError: state.app.errors.register
});

export default connect(
  mapStateToProps,
  { authAccount }
)(Register);
