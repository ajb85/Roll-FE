import React, { useState } from 'react';

import Register from './Register/Register';
import Login from './Login/';
import styles from './styles.module.scss';

function Account(props) {
  const [activeTab, setActiveTab] = useState('register');
  return (
    <section className={styles.Account}>
      <nav>
        <h2
          className={activeTab === 'register' ? '' : styles.inactive}
          onClick={() => setActiveTab('register')}
        >
          Register
        </h2>
        <h2
          className={activeTab === 'login' ? '' : styles.inactive}
          onClick={() => setActiveTab('login')}
        >
          Login
        </h2>
      </nav>
      {activeTab === 'register' && <Register />}
      {activeTab === 'login' && <Login />}
    </section>
  );
}

export default Account;
