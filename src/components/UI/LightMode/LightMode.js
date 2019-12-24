import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colorContext } from 'js/Colors.js';

import { BulbContainer } from './Styles.js';

function LightMode({ inline }) {
  const { colors, switchMode } = useContext(colorContext);

  return (
    <BulbContainer inline={inline} onClick={() => switchMode()}>
      <div>
        <FontAwesomeIcon
          icon={colors.mode === 'dark' ? 'lightbulb-slash' : 'lightbulb-on'}
        />
      </div>
    </BulbContainer>
  );
}

export default LightMode;
