import React from 'react';

import styles from './styles.module.scss';

function Prompt(props) {
  const display = props.showPrompt ? 'initial' : 'none';

  return (
    <div style={{ display }}>
      <div onClick={props.cancel} className={styles.shadow} />
      <div className={styles.content}>
        <p>{props.copy}</p>
        <div>
          <button onClick={props.confirm}>
            {props.yesButtonText || 'Yes'}
          </button>
          <button onClick={props.cancel}>
            {props.noButtonText || 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
}

// function usePrompt(initialValue) {
//   const [prompt, setPrompt] = useState(initialValue || false);
//   const togglePrompt = () => setPrompt(!prompt);
//   return [prompt, togglePrompt];
// }

export default Prompt;
