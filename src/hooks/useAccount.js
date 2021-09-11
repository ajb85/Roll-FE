import { useState, createContext, useCallback, useContext, useEffect, useRef } from "react";

import { useAxios, useToken } from "./";

const context = createContext();
const { Provider } = context;

const initialAccount = {
  id: null,
  username: "",
  email: "",
  wins: 0,
  losses: 0,
};

export function AccountProvider(props) {
  const { token, setTokenIsValidated, setToken } = useToken();
  const [axios, accountIsLoading] = useAxios();

  const [account, setAccount] = useState(initialAccount);
  const fetchedFromToken = useRef(false);

  const handleAuth = useCallback(
    async (formData) => {
      const authInfo = await axios.post("/auth", formData);

      if (authInfo) {
        const { token: newToken, ...accountInfo } = authInfo;
        setAccount(accountInfo);
        setToken(newToken);
        setTokenIsValidated(true);
      }
    },
    [axios, setToken, setAccount, setTokenIsValidated]
  );

  useEffect(() => {
    if (token && !account.id && !fetchedFromToken.current) {
      fetchedFromToken.current = true;
      axios.get("/auth").then((res) => {
        if (res) {
          const { token: newToken, ...accountInfo } = res;
          if (newToken && accountInfo.id) {
            setAccount(accountInfo);
            setToken(newToken);
            setTokenIsValidated(true);
          }
        }
      });
    } else if (!token && account.id) {
      fetchedFromToken.current = false;
      setAccount(initialAccount);
    }
  }, [token, account, axios, setToken, setTokenIsValidated]);

  const value = { account, user_id: account.id, token, handleAuth, accountIsLoading };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useAccount() {
  return useContext(context);
}
