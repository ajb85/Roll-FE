import { useCallback } from "react";

import ErrorMessage from "components/ErrorMessage/";
import FormButton from "./FormButton.js";

import styles from "./Form.module.scss";

export default function Form(props) {
  const { onSubmit } = props;
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(e);
    },
    [onSubmit]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formInput}>{props.children}</div>
      <ErrorMessage type={props.errorType} />
      <div className={styles.buttons}>
        {props.secondaryButton && (
          <FormButton
            {...props.secondaryButton}
            className={styles.secondaryButton}
            type={props.secondaryButton.type || "button"}
          />
        )}
        {props.primaryButton && <FormButton {...props.primaryButton} />}
      </div>
    </form>
  );
}
