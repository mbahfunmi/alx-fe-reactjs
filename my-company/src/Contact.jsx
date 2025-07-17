// src/Contact.jsx
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server.
    alert(`Thank you for your message, ${formData.name}! We will get back to you shortly.`);
    // Optional: clear form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#ffe0e0', minHeight: 'calc(100vh - 120px)' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: 'calc(100% - 22px)', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: 'calc(100% - 22px)', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message:</label>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ width: 'calc(100% - 22px)', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;