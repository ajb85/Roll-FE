import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles.module.scss';

function Register(props) {
  const {
    state: [form, setForm],
    authAccount,
    colors,
    setIsRegistering,
    isLoading
  } = props;

  const onSubmit = e => {
    e.preventDefault();
    const { username, email, password } = form;
    authAccount({ username, email, password });
  };

  return (
    <form className={styles.standard} onSubmit={e => onSubmit(e)}>
      <div className={styles.inputs}>
        <p>Create a new account</p>
        <input
          name='username'
          type='text'
          value={form.username}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete='username'
          autoFocus
          placeholder='Username'
        />

        <input
          name='email'
          type='email'
          value={form.email}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete='email'
          placeholder='Email'
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
      <p className={styles.error}>{props.registerError}</p>

      <div className={styles.buttons}>
        <button
          type='button'
          name='login'
          style={{
            backgroundColor: colors.primary,
            color: colors.secondary
          }}
          onClick={e => setIsRegistering(false)}
        >
          Login
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
          type='submit'
          name='register'
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary
          }}
        >
          {isLoading ? '...Loading' : 'Register'}
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  registerError: state.app.errors.register
});

export default connect(mapStateToProps, {})(Register);
