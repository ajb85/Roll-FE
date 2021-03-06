import React, { useState, createContext, useContext, useCallback } from "react";

const colorContext = createContext();

class ColorManager {
  constructor() {
    this.dark = {
      primary: "#191919",
      secondary: "#E3E2E2",
      highlight: "#E5ADAA",
      accent: "#474714",
      brightAccent: "#FFFF00",
      mode: "dark",
    };

    this.light = {
      primary: "#FCFCFC",
      secondary: "#191919",
      highlight: "#B33A3A",
      accent: "#FDFDCA",
      brightAccent: "#FFFF00",
      mode: "light",
    };

    this.mode = "dark";
  }

  retrieve(mode) {
    if (!mode) {
      const toggle = { dark: "light", light: "dark" };
      mode = toggle[this.mode];
    }
    this.mode = mode;
    return this[mode];
  }
}

export const colorsMgr = new ColorManager();

export const ColorProvider = (props) => {
  const [colors, setColors] = useState(colorsMgr[colorsMgr.mode]);
  const { Provider } = colorContext;
  const toggleMode = (mode) => setCurrent(colors.retrieve(mode));
  return (
    <Provider
      value={{
        colors,
        toggleMode,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default function useColorMode() {
  return useContext(colorContext);
}
