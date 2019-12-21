import React from 'react';

import styles from './styles.module.scss';

function Prompt(props) {
  const { action, cancel, confirmCopy, cancelCopy } = props;

  return (
    <>
      <div onClick={cancel} className={styles.shadow} />
      <div className={styles.content}>
        <p>{props.children}</p>
        <div>
          <button onClick={action}>{confirmCopy || 'Yes'}</button>
          <button onClick={cancel}>{cancelCopy || 'Cancel'}</button>
        </div>
      </div>
    </>
  );
}

export default Prompt;
