import { combineClasses } from "js/utility";

import styles from "./Form.module.scss";

export default function FormButton(props) {
  const { disabled, onClick, label, children, type, className } = props;

  return (
    <button
      className={combineClasses(disabled && styles.disabled, className)}
      disabled={disabled}
      onClick={onClick}
      type={type || "submit"}
    >
      {label || children}
    </button>
  );
}
