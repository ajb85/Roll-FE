import { useState, useEffect, createContext, useContext } from "react";

const context = createContext();
const { Provider } = context;

// const max = 1500;
const tablet = 800;
const mobile = 500;

function getScreenSize() {
  const win = window;
  const doc = document;
  const docElem = doc.documentElement;
  const body = doc.getElementsByTagName("body")[0];

  const width = parseInt(
    win.innerWidth || docElem.clientWidth || body.clientWidth,
    10
  );

  const height = parseInt(
    win.innerHeight || docElem.clientHeight || body.clientHeight,
    10
  );

  return { width, height };
}

export function ScreenSizeProvider(props) {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const saveScreenSize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", saveScreenSize);
    saveScreenSize();
    return () => window.removeEventListener("resize", saveScreenSize);
  }, [setScreenSize]);

  const isDesktop = screenSize.width > tablet;
  const isTablet = screenSize.width > mobile && screenSize.width <= tablet;
  const isMobile = screenSize.width <= mobile;

  const value = { screenSize, isDesktop, isTablet, isMobile };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useScreenSize() {
  return useContext(context);
}
