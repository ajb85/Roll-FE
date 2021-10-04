import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useColorThemes } from "hooks/";
import { combineClasses, noProp } from "js/utility";

import styles from "./Prompt.module.scss";

function Prompt(props) {
  const { close, primaryButton, secondaryButton, isOpen } = props;
  const { colors } = useColorThemes();

  if (!isOpen) {
    return null;
  }

  return (
    <div onClick={close} className={styles.shadow}>
      <div
        onClick={noProp}
        className={styles.contentWrapper}
        style={{ backgroundColor: colors.secondary }}
      >
        <div className={combineClasses(styles.content, props.className)}>{props.children}</div>
        <div>
          {primaryButton &&
            (primaryButton?.hasOwnProperty("copy") ? (
              <CopyToClipboard text={primaryButton.copy}>
                <button
                  className={!primaryButton.copy ? styles.disabled : ""}
                  disabled={primaryButton.disabled || !primaryButton.copy}
                  onClick={close}
                >
                  {primaryButton.label || "Copy"}
                </button>
              </CopyToClipboard>
            ) : (
              <button disabled={primaryButton?.disabled} onClick={primaryButton?.onClick}>
                {primaryButton?.label || "Yes"}
              </button>
            ))}
          <button disabled={secondaryButton?.disabled} onClick={secondaryButton?.onClick || close}>
            {secondaryButton?.label || "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
