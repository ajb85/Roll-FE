import { useState, useCallback, useEffect, createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";

import { useToken, useGames } from "../";
import defaultListeners from "./listeners/defaults/";

const backendURL = process.env.REACT_APP_API_URL;
const context = createContext();
const { Provider } = context;

export function SocketProvider(props) {
  const { token } = useToken();
  const { updateGame, activeGameIds } = useGames();

  const [socket, setSocket] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [shouldConnect, setShouldConnect] = useState(true); // dev feature

  const subscriptions = useRef({});
  const emitLog = useRef({});
  const context = useRef({});

  const listen = useCallback(
    (room, cb) => {
      subscriptions.current[room] = true;
      socket.on(room, (...args) => {
        cb.apply(this, args);
      });
    },
    [subscriptions, socket]
  );

  const disconnect = useCallback(() => {
    socket.disconnect();
    setShouldConnect(false);
    setSocket();
  }, [socket, setShouldConnect]);

  const connect = useCallback(() => {
    setShouldConnect(true);
  }, [setShouldConnect]);

  useEffect(() => {
    if (token && !socket && shouldConnect) {
      const s = io(backendURL, { auth: { token } });
      setSocket(s);
    } else if (socket) {
      Object.entries(defaultListeners).forEach(([name, callback]) => {
        // Turn on every listener that every instance of the app
        // should have on
        listen(name, callback.bind(context.current));
      });
    }
  }, [token, socket, listen, shouldConnect]);

  context.current.io = io;
  context.current.socket = socket;
  context.current.listen = listen;
  context.current.subscriptions = subscriptions;
  context.current.games = {
    update: updateGame,
    activeIds: activeGameIds,
  };
  context.current.emitLog = emitLog.current;
  context.current.status = { isConnected, setIsConnected };

  return (
    <Provider value={{ socket, listen, isConnected, disconnect, connect }}>
      {props.children}
    </Provider>
  );
}

export default function useSocket() {
  return useContext(context);
}
