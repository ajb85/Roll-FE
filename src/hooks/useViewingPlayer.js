import { useState, useCallback, useEffect, createContext, useContext } from "react";

import { useAccount } from "./";

const context = createContext();
const { Provider } = context;

export function ViewingPlayerProvider(props) {
  const { user_id } = useAccount();
  const [viewingPlayer, setViewingPlayer] = useState(user_id);

  const updateViewingPlayer = useCallback(
    (e) => {
      setViewingPlayer(Number(e?.target?.dataset?.player || e));
    },
    [setViewingPlayer]
  );

  useEffect(() => {
    if (user_id && !viewingPlayer) {
      setViewingPlayer(Number(user_id));
    }
  }, [user_id, viewingPlayer]);

  const value = {
    viewingPlayer,
    setViewingPlayer: updateViewingPlayer,
    isViewingSelf: viewingPlayer === Number(user_id),
  };

  return <Provider value={value}>{props.children}</Provider>;
}

export default function useViewingPlayer() {
  return useContext(context);
}
