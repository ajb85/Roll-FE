import React, { useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";

import Form from "components/Form/";
import LoadingDice from "components/LoadingDice";

import { useAccount } from "hooks/";

import styles from "./Account.module.scss";

export default function Account(props) {
  const { handleAuth, accountIsLoading } = useAccount();
  const { pathname } = useLocation();

  const [form, setForm] = useState({ username: "", password: "", email: "" });

  const isRegistering = pathname.toLowerCase().includes("register");
  const registerIsComplete = isRegistering && form.email && form.username && form.password;
  const loginIsComplete = !isRegistering && form.username && form.password;
  const canSubmit = registerIsComplete || loginIsComplete;

  const handleChange = useCallback(
    (e) => setForm({ ...form, [e.target.name]: e.target.value }),
    [form, setForm]
  );

  const handleSubmit = useCallback(
    (e) => {
      const formData = { password: form.password };
      if (isRegistering) {
        formData.username = form.username;
        formData.email = form.email;
      } else {
        formData.account = form.username;
      }
      if (canSubmit) {
        handleAuth(formData);
      }
    },
    [handleAuth, form, isRegistering, canSubmit]
  );

  const primaryButton = {
    label: accountIsLoading ? <LoadingDice /> : isRegistering ? "Register" : "Login",
  };

  return (
    <section className={styles.Account}>
      <div className={styles.container}>
        <Form
          onSubmit={handleSubmit}
          errorType={isRegistering ? "register" : "login"}
          primaryButton={primaryButton}
        >
          <h2>{isRegistering ? "Register your account" : "Login to your account"}</h2>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            autoFocus
            placeholder={isRegistering ? "Username" : "Username / Email"}
          />

          {isRegistering && (
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Email"
            />
          )}

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            placeholder="Password"
          />
        </Form>
        <Link to={isRegistering ? "/login" : "/register"} className={styles.link}>
          {isRegistering ? "Login to an existing account" : "Register a new account"}
        </Link>
      </div>
    </section>
  );
}
