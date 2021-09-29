import { useState, useEffect, createContext, useContext } from "react";

import { useGames, useToken } from "hooks";

const context = createContext();
const { Provider } = context;

export function JoinLinkProvider(props) {
  const { tokenIsValidated } = useToken();
  const { addGame } = useGames();
  const [joinLink, setJoinLink] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (joinLink && tokenIsValidated && !isLoading && !hasError) {
      setIsLoading(true);
      addGame({ uuid: joinLink }, "join").then((successful) => {
        successful && setJoinLink("");
        setHasError(!successful);
        setIsLoading(false);
      });
    }
  }, [addGame, joinLink, tokenIsValidated, setHasError, hasError, setIsLoading, isLoading]);

  const value = { joinLink, setJoinLink };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useJoinLink() {
  return useContext(context);
}
