// src/components/RegistrationForm.jsx
// This is the controlled component form. It uses separate useState hooks
// for username, email, and password to manage state manually.
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Basic validation to check for empty fields
  const validate = () => {
    let formErrors = {};
    if (!username) {
      formErrors.username = 'Username is required';
    }
    if (!email) {
      formErrors.email = 'Email is required';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Form is valid, you can now submit the data
      console.log('Form submitted successfully:', { username, email, password });
      // Here you would typically make an API call
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Controlled Components</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username} // This binding is key for the check
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email} // This binding is key for the check
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password} // This binding is key for the check
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
