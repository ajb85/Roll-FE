import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles.module.scss';
import ArrowButton from 'components/UI/ArrowButton/';

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
        <p>Log into an existing account</p>
        <input
          name="username"
          type="text"
          value={form.username}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete="username"
          autoFocus
          placeholder="Account"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete="current-password"
          placeholder="Password"
        />
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.submit}
          type="submit"
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary
          }}
        >
          {isLoading ? '...Loading' : 'Login'}
        </button>
        <p style={{ position: 'relative', zIndex: 10 }}>OR</p>
        <ArrowButton click={() => setIsRegistering(true)} direction="right">
          Register
        </ArrowButton>
      </div>
      <p className={styles.error} style={{ color: colors.highlight }}>
        {props.loginError}
      </p>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  loginError: state.app.errors.login
});

export default connect(mapStateToProps, {})(Login);
