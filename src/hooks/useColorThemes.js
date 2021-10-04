import { useState, useEffect, createContext, useContext, useRef } from "react";

import { hexToRGB } from "js/utility.js";
import { useAxios } from "hooks";

const context = createContext();
const { Provider } = context;

const dark = {
  primary: "#191919",
  secondary: "#E3E2E2",
  dice: "#E3E2E2",
  highlight: "#EEE724",
  accent: "#474714",
  brightAccent: "#FFFF00",
  host: "#15Bf2D",
  error: "#E5ADAA",
  affirmative: "#0B9B27",
  negative: "#E1150A",
  name: "Dark",
  preset: true,
};

const light = {
  primary: "#FCFCFC",
  secondary: "#191919",
  dice: "#191919",
  highlight: "#B33A3A",
  accent: "#FDFDCA",
  brightAccent: "#FFFF00",
  host: "#15DF2D",
  error: "#B33A3A",
  affirmative: "#0B9B27",
  negative: "#E1150A",
  name: "Light",
  preset: true,
};

export const colorKeys = [
  { displayName: "Background", name: "primary" },
  { displayName: "Text & Borders", name: "secondary" },
  { displayName: "Dice", name: "dice" },
  { displayName: "Highlight", name: "highlight" },
  { displayName: "Accent", name: "accent" },
  { displayName: "Bright Accent", name: "brightAccent" },
  { displayName: "Game Host", name: "host" },
  { displayName: "Affirmative", name: "affirmative" },
  { displayName: "Negative", name: "negative" },
  { displayName: "Error", name: "error" },
];

const root = document.documentElement;

function updateCSSColors(colorTheme) {
  const { name, preset, ...colors } = colorTheme;
  for (let category in colors) {
    const cssVar = `--${category}`;
    root.style.setProperty(cssVar, colors[category]);

    const rgbVar = `${cssVar}-rgb`;
    root.style.setProperty(rgbVar, hexToRGB(colors[category]));
  }
}

export function ColorThemesProvider(props) {
  const [axios, isLoading, error] = useAxios();
  const [themes, setThemes] = useState({ dark, light });
  const [activeTheme, setActiveTheme] = useState("dark");
  const [previewTheme, setPreviewTheme] = useState(null);
  const hasFetched = useRef(false);
  const activeColors = previewTheme || themes[activeTheme];

  const addTheme = async (name, { preset, ...theme }) => {
    theme.name = name;
    const updatedThemes = await axios.post("/account/themes/update", { theme });
    if (updatedThemes?.themes) {
      setThemes({ ...themes, ...updatedThemes.themes });
      setActiveTheme(name);
      setPreviewTheme(null);
    }
  };

  const setTheme = async (themeName) => {
    const themeData = await axios.post(`/account/themes/active/${themeName}`);
    if (themeData?.active) {
      setActiveTheme(themeData.active || "dark");
      setPreviewTheme(null);
    }
  };

  const deleteTheme = async () => {
    const updatedThemes = await axios.delete(`/account/themes/${activeTheme}`);
    if (updatedThemes?.themes) {
      setThemes({ ...updatedThemes.themes, dark, light });
      setActiveTheme(updatedThemes.active);
      setPreviewTheme(null);
    }
  };

  useEffect(() => {
    if (!isLoading && !hasFetched.current && !error) {
      axios.get("/account/themes").then((userThemes) => {
        if (userThemes?.themes) {
          hasFetched.current = true;
          setThemes({ ...themes, ...userThemes.themes });
          setActiveTheme(userThemes.active || "dark");
        }
      });
    }
  }, [axios, isLoading, themes, setThemes, error]);

  useEffect(() => {
    if (activeColors) {
      updateCSSColors(activeColors);
    } else {
      setTheme("dark");
    }
  }, [activeColors]); // eslint-disable-line

  const value = {
    colors: activeColors || themes.dark,
    addTheme,
    setTheme,
    activeTheme,
    updateCSSColors,
    deleteTheme,
    themes,
  };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useColorThemes() {
  return useContext(context);
}
