import React, { useState } from 'react';

const Register = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ username, password, role });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />

        <label htmlFor="role">Role:</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
