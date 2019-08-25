import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setToken, saveAccountInfo } from 'reducers/account.js';

function Login(props) {
  const [form, setForm] = useState({ account: '', password: '' });
  const setState = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const login = await axios.post('/auth', form);
      const { token, ...rest } = login.data;
      props.setToken(token);
      props.saveAccountInfo(rest);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={e => onSubmit(e)}>
      <div>
        <label htmlFor="account">Account:</label>
        <input
          name="account"
          type="text"
          value={form.account}
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
      <button type="submit">Login</button>
    </form>
  );
}

export default connect(
  null,
  { setToken, saveAccountInfo }
)(Login);
