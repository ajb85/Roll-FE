import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createNewGame } from 'reducers/games.js';
import styles from './styles.module.scss';

function NewGame(props) {
  const [form, setForm] = useState({ name: '', password: '' });

  const updateForm = e => {
    if (e.target.name !== 'name' || e.target.value.length < 16)
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createNewGame(form);
  };
  return (
    <form className={styles.standard} onSubmit={e => handleSubmit(e)}>
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={e => updateForm(e)}
          autoComplete="one-time-code"
          autoFocus
          placeholder="Game Name"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={e => updateForm(e)}
          autoComplete="new-password"
          placeholder="Password (Private Game)"
        />
      </div>
      <p className={styles.error}>{props.gameError}</p>
      <button type="submit">Create Game</button>
      <button type="button" onClick={() => props.history.push('/')}>
        Cancel
      </button>
    </form>
  );
}

const mapStateToProps = state => ({
  gameError: state.app.errors.game
});
export default connect(
  mapStateToProps,
  { createNewGame }
)(NewGame);
