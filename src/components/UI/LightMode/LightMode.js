import React, { useContext } from "react";
import { VscLightbulbAutofix, VscLightbulb } from "react-icons/vsc";

import { colorContext } from "js/Colors.js";

import { BulbContainer } from "./Styles.js";

function LightMode({ inline }) {
  const { colors, switchMode } = useContext(colorContext);

  return (
    <BulbContainer inline={inline} onClick={() => switchMode()}>
      <div>
        <p>
          {colors.mode === "dark" ? <VscLightbulbAutofix /> : <VscLightbulb />}
        </p>
      </div>
    </BulbContainer>
  );
}

export default LightMode;
