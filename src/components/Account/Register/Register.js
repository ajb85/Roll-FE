import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setToken, saveAccountInfo } from 'reducers/account.js';

function Register(props) {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const setState = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const register = await axios.post('/auth', form);
      console.log(register.data);
      const { token, ...accountInfo } = register.data;
      props.setToken(token);
      props.saveAccountInfo(accountInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          type="text"
          value={form.username}
          onChange={e => setState(e)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={e => setState(e)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={e => setState(e)}
        />
      </div>
      <button type="submit">Register Account</button>
    </form>
  );
}

export default connect(
  null,
  { setToken, saveAccountInfo }
)(Register);
