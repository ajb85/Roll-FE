import React, { useContext } from 'react';

import { PromptContext } from './Context';

import styles from './styles.module.scss';

function Prompt() {
  const {
    promptState: {
      cancel,
      confirm,
      copy,
      showPrompt,
      yesButtonText,
      noButtonText
    }
  } = useContext(PromptContext);

  const display = showPrompt ? 'initial' : 'none';

  return (
    <div style={{ display }}>
      <div onClick={cancel} className={styles.shadow} />
      <div className={styles.content}>
        <p>{copy}</p>
        <div>
          <button onClick={confirm}>{yesButtonText || 'Yes'}</button>
          <button onClick={cancel}>{noButtonText || 'Cancel'}</button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
