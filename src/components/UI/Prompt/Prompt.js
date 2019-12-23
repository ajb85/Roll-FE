import React from 'react';

import { colorContext } from 'js/Colors.js';
import { Shadow } from './Styles.js';
import styles from './styles.module.scss';

function Prompt(props) {
  const { action, cancel, confirmCopy, cancelCopy } = props;
  const { colors } = React.useContext(colorContext);
  return (
    <>
      <Shadow colors={colors} onClick={cancel} className={styles.shadow} />
      <div
        className={styles.content}
        style={{ backgroundColor: colors.secondary }}
      >
        <p style={{ color: colors.primary }}>{props.children}</p>
        <div>
          <button onClick={action}>{confirmCopy || 'Yes'}</button>
          <button onClick={cancel}>{cancelCopy || 'Cancel'}</button>
        </div>
      </div>
    </>
  );
}

export default Prompt;
