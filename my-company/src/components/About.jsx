// src/About.jsx
import React from 'react';

function About() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#e0ffff', minHeight: 'calc(100vh - 120px)' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>About Us</h1>
      <p style={{ color: '#34495e', lineHeight: '1.6', maxWidth: '800px' }}>
        Our company has been providing top-notch services since 1990. We specialize in various fields including technology, marketing, and consultancy, aiming to provide innovative solutions to our clients.
      </p>
      <p style={{ color: '#34495e', lineHeight: '1.6', maxWidth: '800px', marginTop: '15px' }}>
        Our mission is to empower businesses with cutting-edge strategies and robust development.
      </p>
    </div>
  );
}

export default About;