import React, { useState, createContext } from 'react';
export const colorContext = createContext();

class ColorManager {
  constructor() {
    this.dark = {
      primary: '#191919',
      secondary: '#949494',
      highlight: '#632B30',
      mode: 'dark'
    };

    this.light = {
      primary: '#FCFCFC',
      secondary: '#191919',
      highlight: '#632B30',
      mode: 'light'
    };

    this.set = 'dark';
  }

  setTo(mode) {
    if (!mode) {
      const convert = { dark: 'light', light: 'dark' };
      mode = convert[this.set];
    }
    this.set = mode;

    // for (let color in this[mode]) {
    //   this[color] = this[mode][color];
    // }
    // this.set = mode;
    return this[mode];
  }
}
export const colors = new ColorManager();

const ColorProvider = props => {
  const [current, setCurrent] = useState(colors.dark);
  const { Provider } = colorContext;
  return (
    <Provider
      value={{
        colors: current,
        switchMode: mode => setCurrent(colors.setTo(mode))
      }}
    >
      {props.children}
    </Provider>
  );
};

export default ColorProvider;
