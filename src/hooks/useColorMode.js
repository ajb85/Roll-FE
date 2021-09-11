import { useState, useEffect, createContext, useContext } from "react";

import { hexToRGB } from "js/utility.js";

const context = createContext();
const { Provider } = context;

const dark = {
  primary: "#191919",
  secondary: "#E3E2E2",
  highlight: "#E5ADAA",
  accent: "#474714",
  brightAccent: "#FFFF00",
  mode: "dark",
  error: "#E5ADAA",
};

const light = {
  primary: "#FCFCFC",
  secondary: "#191919",
  highlight: "#B33A3A",
  accent: "#FDFDCA",
  brightAccent: "#FFFF00",
  mode: "light",
  error: "#B33A3A",
};

const root = document.documentElement;

function updateCSSColors(colorMode) {
  const { mode, ...colors } = colorMode;
  for (let category in colors) {
    const cssVar = `--${category}`;
    root.style.setProperty(cssVar, colors[category]);

    const rgbVar = `${cssVar}-rgb`;
    root.style.setProperty(rgbVar, hexToRGB(colors[category]));
  }
}

export function ColorProvider(props) {
  const [colors, setColors] = useState(dark);
  const toggleMode = () => setColors(colors === dark ? light : dark);
  const isMode = (mode) =>
    (mode === "dark" && colors === dark) || (mode === "light" && colors === light);

  useEffect(() => {
    updateCSSColors(colors);
  }, [colors]);

  const value = { colors, toggleMode, isMode };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useColorMode() {
  return useContext(context);
}
