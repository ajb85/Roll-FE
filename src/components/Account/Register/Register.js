import React, { useState } from 'react';

function Register(props) {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const setState = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
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

export default Register;
