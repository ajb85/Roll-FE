import React from 'react';
import { connect } from 'react-redux';

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
        <p>Log into existing account</p>
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
      <p className={styles.error}>{props.loginError}</p>

      <div className={styles.buttons}>
        <button
          type='submit'
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary
          }}
        >
          {isLoading ? '...Loading' : 'Login'}
        </button>
        <div
          className={styles.bubble}
          style={{
            width: '25px'
          }}
        >
          <div
            className={styles.block}
            style={{ backgroundColor: colors.primary }}
          />
          <div
            className={styles.arrowBase}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.secondary
            }}
          />
          <div
            className={styles.arrow}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.secondary
            }}
          />
          <div
            className={styles.arrowCover}
            style={{ backgroundColor: colors.primary }}
          />
          <div
            className={styles.block}
            style={{ backgroundColor: colors.primary }}
          />
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
          type='button'
          style={{
            backgroundColor: colors.primary,
            color: colors.secondary
          }}
          onClick={() => setIsRegistering(true)}
        >
          {isLoading ? '...Loading' : 'Register'}
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  loginError: state.app.errors.login
});

export default connect(mapStateToProps, {})(Login);
