import React, { useState } from 'react';

import Form from './Form.js';
import styles from './styles.module.scss';

function Account(/*{ history }*/) {
  const [isRegistering, setIsRegistering] = useState(false);

  // React.useEffect(() => {
  // Reset users to start of app
  // Decided against so if an expired token logs them out,
  // they go back where they were
  //   history.push('/');
  // }, [history]);
  return (
    <section className={styles.Account}>
      <nav>
        <h2
          className={isRegistering ? '' : styles.inactive}
          onClick={() => setIsRegistering(true)}
        >
          Register
        </h2>
        <h2
          className={!isRegistering ? '' : styles.inactive}
          onClick={() => setIsRegistering(false)}
        >
          Login
        </h2>
      </nav>
      <Form isRegistering={isRegistering} />
    </section>
  );
}

export default Account;
