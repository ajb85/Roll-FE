import { useState, useEffect, useCallback, createContext, useContext } from "react";

const context = createContext();
const { Provider } = context;

export function TokenProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tokenIsValidated, setTokenIsValidated] = useState(false);

  const logout = useCallback(() => {
    setToken("");
    setTokenIsValidated(false);
  }, [setToken, setTokenIsValidated]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const value = { token, setToken, logout, tokenIsValidated, setTokenIsValidated };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useToken() {
  return useContext(context);
}
