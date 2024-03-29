import { useState, useEffect, createContext, useContext, useRef, useCallback } from "react";

import { hexToRGB } from "js/utility.js";
import { useAxios, useToken } from "hooks";

const context = createContext();
const { Provider } = context;

const Dark = {
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

const Light = {
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

const Night = {
  dice: "#f64c71",
  host: "#15Bf2D",
  error: "#E5ADAA",
  accent: "#2f2fa1",
  primary: "#242582",
  negative: "#E1150A",
  highlight: "#EEE724",
  secondary: "#99728d",
  affirmative: "#0B9B27",
  brightAccent: "#f64c71",
  name: "Night",
  preset: true,
};

const Neon = {
  dice: "#e900ff",
  host: "#1685f8",
  error: "#f52789",
  accent: "#389583",
  primary: "#3d144c",
  negative: "#E1150A",
  highlight: "#faeb2c",
  secondary: "#1685f8",
  affirmative: "#0B9B27",
  brightAccent: "#8de4af",
  name: "Neon",
  preset: true,
};

const Beach = {
  dice: "#fbeec1",
  host: "#15Bf2D",
  error: "#E5ADAA",
  accent: "#bd986b",
  primary: "#659ebc",
  negative: "#E1150A",
  highlight: "#EEE724",
  secondary: "#fbeec1",
  affirmative: "#0B9B27",
  brightAccent: "#daad86",
  name: "Beach",
  preset: true,
};

const Forest = {
  dice: "#65da99",
  host: "#15Bf2D",
  error: "#E5ADAA",
  accent: "#389583",
  primary: "#04396b",
  negative: "#E1150A",
  highlight: "#edf5e0",
  secondary: "#389583",
  affirmative: "#0B9B27",
  brightAccent: "#8de4af",
  name: "Forest",
  preset: true,
};

const Spooktober = {
  dice: "#dc5414",
  host: "#e43606",
  name: "Spooktober",
  error: "#f5274d",
  accent: "#370b05",
  primary: "#0d0404",
  negative: "#E1150A",
  highlight: "#dc5414",
  secondary: "#e43606",
  affirmative: "#0B9B27",
  brightAccent: "#da5238",
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

    localStorage.setItem("lastColors", JSON.stringify(colorTheme));
    localStorage.setItem("lastActive", colorTheme.name);
  }
}

const defaultThemes = { Dark, Light, Night, Neon, Beach, Forest, Spooktober };

const lastColorsStr = localStorage.getItem("lastColors");
const lastColors = lastColorsStr && JSON.parse(lastColorsStr);
const lastActive = localStorage.getItem("lastActive");

if (lastColors && !defaultThemes[lastColors.name]) {
  defaultThemes[lastColors.name] = lastColors;
}

lastColors && updateCSSColors(lastColors);

export function ColorThemesProvider(props) {
  const { tokenIsValidated } = useToken();
  const [axios, isLoading, error] = useAxios();
  const [themes, setThemes] = useState(defaultThemes);
  const [activeTheme, setActiveTheme] = useState(lastColors && lastActive ? lastActive : "Dark");
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

  const setTheme = useCallback(
    async (themeName) => {
      const themeData = await axios.post(`/account/themes/active/${themeName}`);
      if (themeData?.active) {
        setActiveTheme(themeData.active || "Dark");
        setPreviewTheme(null);
      }
    },
    [setActiveTheme, axios, setPreviewTheme]
  );

  const deleteTheme = async () => {
    const updatedThemes = await axios.delete(`/account/themes/${activeTheme}`);
    if (updatedThemes?.themes) {
      setThemes({ ...updatedThemes.themes, defaultThemes });
      setActiveTheme(updatedThemes.active);
      setPreviewTheme(null);
    }
  };

  useEffect(() => {
    if (tokenIsValidated && !isLoading && !hasFetched.current && !error) {
      axios.get("/account/themes").then((userThemes) => {
        if (userThemes?.themes) {
          hasFetched.current = true;
          setThemes({ ...themes, ...userThemes.themes });
          setActiveTheme(userThemes.active || "Dark");
        }
      });
    }
  }, [axios, isLoading, themes, setThemes, error, tokenIsValidated]);

  useEffect(() => {
    if (activeColors) {
      updateCSSColors(activeColors);
    } else {
      setTheme("Dark");
    }
  }, [activeColors, setTheme]);

  const value = {
    colors: activeColors || themes.Dark,
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
