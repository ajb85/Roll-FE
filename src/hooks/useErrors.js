import { useState, createContext, useContext } from "react";

const context = createContext();
const { Provider } = context;

const initialErrors = {
  login: "",
  register: "",
  game: "",
  play: "",
};

export function ErrorsProvider(props) {
  const [errors, setErrors] = useState(initialErrors);

  const addError = (key, errorMessage) => setErrors({ ...errors, [key]: errorMessage });
  const clearError = (key) => setErrors({ ...errors, [key]: "" });

  const value = { errors, addError, clearError };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useErrors() {
  return useContext(context);
}
