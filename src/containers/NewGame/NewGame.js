import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import Form from "components/Form/";

import { useGames, useErrors } from "hooks";
import { goHome } from "js/utility";

export default function NewGame(props) {
  const { pathname } = useLocation();
  const { addGame } = useGames();
  const { clearError } = useErrors();

  const [form, setForm] = useState({ name: "", password: "" });

  const isJoining = pathname.toLowerCase().includes("join");

  const updateForm = useCallback(
    (e) => {
      if (e.target.name !== "name" || e.target.value.length < 16) {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    },
    [form, setForm]
  );

  const handleSubmit = useCallback(
    (e) => {
      if (form.name && form.name.length < 16) {
        addGame(form, isJoining ? "join" : "create");
      }
    },
    [addGame, form, isJoining]
  );

  useEffect(() => clearError("game"), [pathname]); // eslint-disable-line

  const primaryButton = {
    label: isJoining ? "Join Game" : "Create Game",
    disabled: !form.name,
  };

  return (
    <Form
      errorType="game"
      onSubmit={handleSubmit}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    >
      <h2>{isJoining ? "Join an Existing Game" : "Start a New Game"}</h2>
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={updateForm}
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
          onChange={updateForm}
          autoComplete="new-password"
          placeholder={isJoining ? "Password" : "Password (Private Game)"}
        />
      </div>
    </Form>
  );
}

const secondaryButton = {
  label: "Cancel",
  onClick: goHome,
};
