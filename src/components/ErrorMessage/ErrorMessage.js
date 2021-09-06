import { useColorMode, useErrors } from "hooks/";

import styles from "./ErrorMessage.module.scss";

export default function ErrorMessage(props) {
  const { colors } = useColorMode();
  const { errors } = useErrors();

  return (
    <p className={styles.error} style={{ color: colors.error }}>
      {props.message || errors[props.type] || ""}
    </p>
  );
}
