import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import Form from "components/Form/";

import { useGames, useErrors } from "hooks";
import { goHome } from "js/utility";

const maxNameLength = 15;

export default function NewGame(props) {
  const { pathname } = useLocation();
  const { addGame } = useGames();
  const { clearError } = useErrors();

  const [name, setName] = useState("");
  const [privateGame, setPrivateGame] = useState(true);

  const updateName = useCallback(
    (e) => e.target.value.length <= maxNameLength && setName(e.target.value),
    [setName]
  );

  const togglePrivate = useCallback((e) => setPrivateGame(e.target.checked), [setPrivateGame]);

  const handleSubmit = useCallback(
    (e) => {
      if (name && name.length <= maxNameLength) {
        addGame({ name, private: privateGame }, "create");
      }
    },
    [addGame, name, privateGame]
  );

  useEffect(() => clearError("game"), [pathname]); // eslint-disable-line

  return (
    <Form
      errorType="game"
      onSubmit={handleSubmit}
      primaryButton={{ label: "Create Game", onClick: handleSubmit }}
      secondaryButton={secondaryButton}
    >
      <h2>Start a New Game</h2>
      <div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={updateName}
          autoComplete="one-time-code"
          autoFocus
          placeholder="Game Name"
        />
      </div>
      <div>
        <label>
          Is this a private game?
          <input type="checkbox" name="private" checked={privateGame} onChange={togglePrivate} />
        </label>
      </div>
    </Form>
  );
}

const secondaryButton = {
  label: "Cancel",
  onClick: goHome,
};
