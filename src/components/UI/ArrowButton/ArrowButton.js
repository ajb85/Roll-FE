import React, { useContext } from 'react';

import { colorContext } from 'js/Colors.js';
import styles from './styles.module.scss';
import { Arrow, SwitchCircle, Blocker, ArrowHead } from './Styles.js';

function ArrowButton(props) {
  const { direction } = props;
  const { colors } = useContext(colorContext);
  return (
    <div
      className={styles.arrowContainer}
      onClick={props.click}
      style={{
        zIndex: 1,
        transform: direction === 'right' ? null : 'scaleX(-1)'
      }}
    >
      <SwitchCircle
        direction={direction}
        colors={colors}
        className={styles.switchCircle}
        circle="main"
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
      <Arrow
        direction={direction}
        colors={colors}
        className={styles.arrowButton}
      >
        <button
          type="button"
          style={{ transform: direction === 'right' ? null : 'scaleX(-1)' }}
        >
          {props.children}
        </button>
        <ArrowHead
          className={styles.arrowHead}
          style={{ padding: 0 }}
          direction={direction}
        />
      </Arrow>
    </div>
  );
}

export default ArrowButton;
