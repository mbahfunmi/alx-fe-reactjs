// src/components/ControlledForm.jsx
import React, { useState } from 'react';

const API_URL = 'https://reqres.in/api/register';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = 'First name is required';
  if (!values.lastName.trim()) errors.lastName = 'Last name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!emailRegex.test(values.email)) errors.email = 'Enter a valid email';
  if (!values.password) errors.password = 'Password is required';
  else if (values.password.length < 6) errors.password = 'Min 6 characters';
  if (!values.confirmPassword) errors.confirmPassword = 'Confirm your password';
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match';
  if (!values.terms) errors.terms = 'You must accept the terms';
  return errors;
}

export default function ControlledForm() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: '', error: '' });

  const errors = validate(values);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      firstName: true, lastName: true, email: true,
      password: true, confirmPassword: true, terms: true
    });
    if (Object.keys(errors).length) return;

    try {
      setLoading(true);
      setStatus({ success: '', error: '' });

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setStatus({ success: `Registered! Token/ID: ${data.token || data.id || 'N/A'}`, error: '' });
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      });
      setTouched({});
    } catch (err) {
      setStatus({ success: '', error: err.message });
    } finally {
      setLoading(false);
    }
  }

  const showError = (field) => touched[field] && errors[field];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Controlled Components</h2>
      <p className="small">Manually manage state with <code>useState</code>.</p>
      
      {status.success && <div className="success" role="status" aria-live="polite">{status.success}</div>}
      {status.error && <div className="error" role="alert" aria-live="assertive">{status.error}</div>}

      <div className="form-row">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName" name="firstName" type="text"
          value={values.firstName} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError('firstName')}
        />
        {showError('firstName') && <div className="error">{errors.firstName}</div>}
      </div>
      {/* ... rest of the form fields ... */}
      <div className="form-row">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName" name="lastName" type="text"
          value={values.lastName} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError('lastName')}
        />
        {showError('lastName') && <div className="error">{errors.lastName}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email"
          value={values.email} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError('email')}
        />
        {showError('email') && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          id="password" name="password" type="password"
          value={values.password} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError('password')}
        />
        {showError('password') && <div className="error">{errors.password}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword" name="confirmPassword" type="password"
          value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={!!showError('confirmPassword')}
        />
        {showError('confirmPassword') && <div className="error">{errors.confirmPassword}</div>}
      </div>

      <div className="form-row">
        <label>
          <input
            type="checkbox" name="terms"
            checked={values.terms} onChange={handleChange} onBlur={handleBlur}
            aria-invalid={!!showError('terms')}
          /> I accept the Terms & Conditions
        </label>
        {showError('terms') && <div className="error">{errors.terms}</div>}
      </div>

      <div className="actions">
        <button className="primary" type="submit" disabled={loading || !values.terms}>
          {loading ? 'Submitting…' : 'Register'}
        </button>
        <span className="small">Uses fetch → Reqres mock API</span>
      </div>
    </form>
  );
}
