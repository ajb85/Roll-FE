import React, { useContext } from 'react';

import { colorContext } from 'js/Colors.js';
import styles from './styles.module.scss';
import { Arrow, SwitchCircle, Blocker, ArrowHead } from './Styles.js';

function ArrowButton(props) {
  const { direction } = props;
  const { colors } = useContext(colorContext);
  return (
    <div className={styles.container} style={{ width: 215, padding: 0 }}>
      <SwitchCircle
        direction={direction}
        colors={colors}
        className={styles.switchCircle}
      />
      <Blocker
        direction={direction}
        colors={colors}
        piece="top"
        className={styles.blocker}
      />
      <Blocker
        direction={direction}
        colors={colors}
        piece="bot"
        className={styles.blocker}
      />
      <Arrow type="button" colors={colors} className={styles.arrowButton}>
        {props.children}
        <ArrowHead
          className={styles.arrowHead}
          style={{ padding: 0 }}
          direction={direction}
        >
          <div />
          <div />
          <div />
        </ArrowHead>
      </Arrow>
    </div>
  );
}

export default ArrowButton;
