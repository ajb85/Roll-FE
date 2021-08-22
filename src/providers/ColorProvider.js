import { useState, createContext, useContext } from "react";
const context = createContext();
const { Provider } = context;

const dark = {
  primary: "#191919",
  secondary: "#E3E2E2",
  highlight: "#E5ADAA",
  accent: "#474714",
  brightAccent: "#FFFF00",
  mode: "dark",
};

const light = {
  primary: "#FCFCFC",
  secondary: "#191919",
  highlight: "#B33A3A",
  accent: "#FDFDCA",
  brightAccent: "#FFFF00",
  mode: "light",
};

export default function ColorProvider(props) {
  const [colors, setColors] = useState(dark);
  const toggleMode = () => setColors(colors === dark ? light : dark);
  const isMode = (mode) =>
    (mode === "dark" && colors === dark) ||
    (mode === "light" && colors === light);

  const value = { colors, toggleMode, isMode };
  return <Provider value={value}>{props.children}</Provider>;
}

export function useProviderState() {
  return useContext(context);
}
