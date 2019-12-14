import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colorContext } from 'js/Colors.js';

import styles from './styles.module.scss';

function LightMode(props) {
  const { colors, switchMode } = useContext(colorContext);

  return (
    <div className={styles.lightMode} onClick={() => switchMode()}>
      <FontAwesomeIcon
        icon={colors.mode === 'dark' ? 'lightbulb-slash' : 'lightbulb-on'}
      />
    </div>
  );
}

export default LightMode;
