import { useState, useEffect, createContext, useContext } from "react";

import { useGames, useToken } from "hooks";

const context = createContext();
const { Provider } = context;

export function JoinLinkProvider(props) {
  const { tokenIsValidated } = useToken();
  const { addGame } = useGames();
  const [joinLink, setJoinLink] = useState("");

  useEffect(() => {
    if (joinLink && tokenIsValidated) {
      addGame({ uuid: joinLink }, "join");
    }
  }, [addGame, joinLink, tokenIsValidated]);

  const value = { joinLink, setJoinLink };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useJoinLink() {
  return useContext(context);
}