import { memo } from "react";
import ColorProvider from "./ColorProvider.js";
import ScreenSizeProvider from "./ScreenSizeProvider.js";

export default memo(function Providers(props) {
  return (
    <ColorProvider>
      <ScreenSizeProvider>{props.children}</ScreenSizeProvider>
    </ColorProvider>
  );
});
