import React, { useState, createContext, useContext } from "react";

const colorContext = createContext();

class ColorManager {
  constructor() {
    this.modes = {
      dark: {
        primary: "#191919",
        secondary: "#E3E2E2",
        highlight: "#E5ADAA",
        accent: "#474714",
        brightAccent: "#FFFF00",
        mode: "dark",
      },
      light: {
        primary: "#FCFCFC",
        secondary: "#191919",
        highlight: "#B33A3A",
        accent: "#FDFDCA",
        brightAccent: "#FFFF00",
        mode: "light",
      },
    };

    this.modeNames = Object.keys(this.modes);
    this.mode = "dark";
  }

  nextMode(mode) {
    if (!mode || !this.modes[mode]) {
      const currentIndex = this.modeNames.findIndex(
        (name) => name === this.mode
      );
      const nextIndex =
        currentIndex + 1 >= this.modeNames.length ? 0 : currentIndex + 1;

      mode = this.modeNames[nextIndex];
    }

    console.log("NEXT MDOE: ", mode, this.modes[mode]);
    this.mode = mode;
    return this.modes[mode];
  }
}

export const colorsMgr = new ColorManager();

export const ColorProvider = (props) => {
  const [colors, setColors] = useState(colorsMgr.modes[colorsMgr.mode]);
  const { Provider } = colorContext;
  const toggleMode = (mode) => setColors(colorsMgr.nextMode(mode));
  const isMode = (mode) => colorsMgr.mode === mode;
  return (
    <Provider
      value={{
        colors,
        toggleMode,
        isMode,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default function useColorMode() {
  return useContext(colorContext);
}
