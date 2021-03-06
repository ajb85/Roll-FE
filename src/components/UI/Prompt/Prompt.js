import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import useColorMode from "hooks/useColorMode.js";
import { Shadow } from "./Styles.js";
import styles from "./styles.module.scss";

function Prompt(props) {
  const { action, cancel, confirmCopy, cancelCopy, copy } = props;
  const { colors } = useColorMode();
  return (
    <>
      <Shadow colors={colors} onClick={cancel} className={styles.shadow} />
      <div
        className={styles.content}
        style={{ backgroundColor: colors.secondary }}
      >
        <p style={{ color: colors.primary }}>{props.children}</p>
        <div>
          {copy ? (
            <CopyToClipboard text={props.textToCopy}>
              <button>{confirmCopy || "Copy"}</button>
            </CopyToClipboard>
          ) : (
            <button onClick={action}>{confirmCopy || "Yes"}</button>
          )}
          <button onClick={cancel}>{cancelCopy || "Cancel"}</button>
        </div>
      </div>
    </>
  );
}

export default Prompt;
