import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { joinGame } from 'reducers/games.js';
import styles from './styles.module.scss';

function JoinGame(props) {
  const [form, setForm] = useState({ name: '', password: '' });
  const history = useHistory();

  const updateForm = e => {
    if (e.target.name !== 'name' || e.target.value.length < 16) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.name.length) {
      props.joinGame(form);
    }
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
          placeholder="Game name"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={e => updateForm(e)}
          autoComplete="new-password"
          placeholder="Password"
        />
      </div>
      <p className={styles.error}>{props.gameError}</p>
      <button type="submit">Join</button>
      <button type="button" onClick={() => history.push('/')}>
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
  { joinGame }
)(JoinGame);
