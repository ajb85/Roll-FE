import React from "react";
import { VscLightbulbAutofix, VscLightbulb } from "react-icons/vsc";

import useColorMode from "hooks/useColorMode.js";

import { BulbContainer } from "./Styles.js";

function LightMode({ inline }) {
  const { colors, toggleMode } = useColorMode();

  return (
    <BulbContainer inline={inline} onClick={toggleMode}>
      <div>
        <p>
          {colors.mode === "dark" ? <VscLightbulbAutofix /> : <VscLightbulb />}
        </p>
      </div>
    </BulbContainer>
  );
}

export default LightMode;
