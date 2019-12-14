import React from 'react';
import { connect } from 'react-redux';

import ArrowButton from 'components/UI/ArrowButton/';

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

      <div className={styles.buttons}>
        <button
          className={styles.submit}
          type='submit'
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary
          }}
        >
          {isLoading ? '...Loading' : 'Register'}
        </button>
        <p style={{ position: 'relative', zIndex: 10 }}>OR</p>
        <ArrowButton click={() => setIsRegistering(false)} direction='right'>
          Login
        </ArrowButton>
      </div>
      <p className={styles.error} style={{ color: colors.highlight }}>
        {props.registerError}
      </p>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  registerError: state.app.errors.register
});

export default connect(mapStateToProps, {})(Register);
