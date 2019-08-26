import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { saveAccountInfo } from 'reducers/account.js';

function Login(props) {
  const [form, setForm] = useState({ account: '', password: '' });
  const setState = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    axios.post('/auth', form);
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
      <button type="submit" disabled={props.isLoading}>
        {props.isLoading ? '...' : 'Login'}
      </button>
    </form>
  );
}

const mapStateToProps = state => ({
  isLoading: state.account.isLoading
});

export default connect(
  mapStateToProps,
  { saveAccountInfo }
)(Login);
