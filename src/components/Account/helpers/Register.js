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
      <div className={`${styles.inputs} ${styles.register}`}>
        <p>Register your account</p>
        <input
          name="username"
          type="text"
          value={form.username}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete="username"
          autoFocus
          placeholder="Username"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          autoComplete="email"
          placeholder="Email"
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
      <p className={styles.error} style={{ color: colors.highlight }}>
        {props.registerError}
      </p>
      <div className={styles.buttons}>
        <button type="submit" className={styles.submit}>
          {isLoading ? '...Loading' : 'Register'}
        </button>
        <p onClick={() => setIsRegistering(false)} className={styles.link}>
          Login to an existing account
        </p>
      </div>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  registerError: state.app.errors.register
});

export default connect(mapStateToProps, {})(Register);
