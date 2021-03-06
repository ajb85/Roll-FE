import React, { useState } from "react";
import { connect } from "react-redux";

import Login from "./helpers/Login.js";
import Register from "./helpers/Register.js";

import { authAccount } from "reducers/account.js";
import styles from "./styles.module.scss";

import useColorMode from "hooks/useColorMode.js";

function Account(props) {
  const [isRegistering, setIsRegistering] = useState(null);
  const { authAccount } = props;
  const formState = useState({ username: "", password: "", email: "" });
  const { colors } = useColorMode();

  return (
    <section className={styles.Account}>
      <div className={styles.container}>
        {isRegistering && (
          <Register
            state={formState}
            authAccount={authAccount}
            colors={colors}
            setIsRegistering={setIsRegistering}
          />
        )}
        {!isRegistering && (
          <Login
            state={formState}
            authAccount={authAccount}
            colors={colors}
            setIsRegistering={setIsRegistering}
          />
        )}
      </div>
    </section>
  );
}

export default connect(null, { authAccount })(Account);
