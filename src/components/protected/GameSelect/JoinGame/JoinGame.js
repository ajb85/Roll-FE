import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { joinGame } from "reducers/games.js";
import styles from "./styles.module.scss";

function JoinGame(props) {
  const [form, setForm] = useState({ name: "", password: "" });
  const history = useHistory();
  const { uuid } = useParams();

  if (uuid) {
    props.joinGame({ uuid });
  }

  const updateForm = (e) => {
    if (e.target.name !== "name" || e.target.value.length < 16) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.length) {
      props.joinGame(form);
    }
  };

  return (
    <form className={styles.standard} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={updateForm}
          autoComplete="one-time-code"
          placeholder="Game name"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={updateForm}
          autoComplete="new-password"
          placeholder="Password"
        />
      </div>
      <p className={styles.error}>{props.gameError}</p>
      <div className={styles.buttons}>
        <button className={styles.submit} type="submit">
          Join
        </button>
        <button
          className={styles.submit}
          type="button"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  gameError: state.app.errors.game,
});

export default connect(mapStateToProps, { joinGame })(JoinGame);
