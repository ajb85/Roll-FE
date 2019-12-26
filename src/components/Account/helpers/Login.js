import React from 'react';
import { connect } from 'react-redux';

import LoadingDice from 'components/UI/LoadingDice/';

import styles from '../styles.module.scss';

function Login(props) {
  const {
    state: [form, setForm],
    authAccount,
    colors,
    setIsRegistering,
    isLoading
  } = props;

  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    authAccount({ account: username, password });
  };

  return (
    <form className={styles.standard} onSubmit={e => onSubmit(e)}>
      <div className={styles.inputs}>
        <p>Login to your account</p>
        <input
          name='username'
          type='text'
          value={form.username}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete='username'
          autoFocus
          placeholder='Account'
        />

        <input
          name='password'
          type='password'
          value={form.password}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete='current-password'
          placeholder='Password'
        />
      </div>
      <p className={styles.error} style={{ color: colors.highlight }}>
        {props.loginError}
      </p>
      <div className={styles.buttons}>
        <button type='submit' className={styles.submit}>
          {isLoading ? <LoadingDice /> : 'Login'}
        </button>
        <p onClick={() => setIsRegistering(true)} className={styles.link}>
          Register a new account
        </p>
      </div>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  loginError: state.app.errors.login
});

export default connect(mapStateToProps, {})(Login);
