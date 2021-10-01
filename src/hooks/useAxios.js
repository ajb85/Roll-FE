import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { useErrors, useToken } from "./";
import { mergeObjects } from "../js/utility.js";

const defaultConfig = {
  headers: {
    authorization: localStorage.getItem("token"),
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
};

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

export default function useAxios() {
  const history = useHistory();
  const { token, setTokenIsValidated, logout } = useToken();
  const { addError, clearError } = useErrors();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const errorKey = useRef();
  const cache = useRef(new Map());
  const timeout = useRef(null);

  const resetCache = useCallback(() => {
    cache.current = new Map();
    timeout.current = null;
  }, []);

  token && (defaultConfig.headers.authorization = token);

  const fetch =
    (method) =>
    async (url, data = {}, config = {}) => {
      const hasData = method === "post" || method === "put";
      const dataToCache = hasData ? data : config;
      if (!isLoading) {
        try {
          timeout.current && clearTimeout(timeout.current);
          timeout.current = setTimeout(resetCache, 5000);
          setIsLoading(true);
          const callArgs = [url];

          if (cache.current.has(dataToCache)) {
            return cache.current.get(dataToCache);
          }

          if (hasData) {
            callArgs.push(data);
          }

          callArgs.push(mergeObjects(defaultConfig, config));
          const results = await axios[method](...callArgs);

          setIsLoading(false);

          if (results && results.data) {
            cache.current.set(dataToCache, results.data);
            setError(false);
            errorKey.current && clearError(errorKey.current);
            token && setTokenIsValidated(true);
            return results.data;
          } else throw results;
        } catch (err) {
          setIsLoading(false);
          setError(true);
          cache.current.set(dataToCache, false);
          const errorResponse = (err && err.response) || {};
          const { requestType, message } = errorResponse.data || {};

          if (requestType && message) {
            errorKey.current = requestType;
            addError(requestType, message);
          } else if (errorResponse.status === 401) {
            setTokenIsValidated(false);
            logout();
            history.push("/");
          }

          return err;
        }
      } else return false;
    };

  return [
    {
      get: fetch("get"),
      post: fetch("post"),
      put: fetch("put"),
      delete: fetch("delete"),
    },
    isLoading,
    error,
    setError,
  ];
}
