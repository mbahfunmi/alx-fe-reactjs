// src/Services.jsx
import React from 'react';

function Services() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f8f8ff', minHeight: 'calc(100vh - 120px)' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #2ecc71', paddingBottom: '10px' }}>Our Services</h1>
      <ul style={{ listStyleType: 'disc', marginLeft: '20px', color: '#34495e' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#27ae60' }}>Technology Consulting:</strong> Expert advice and solutions for your IT infrastructure.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#27ae60' }}>Market Analysis:</strong> In-depth research to identify market trends and opportunities.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#27ae60' }}>Product Development:</strong> From concept to launch, we build innovative products.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#27ae60' }}>Digital Marketing:</strong> Strategies to boost your online presence and reach.
        </li>
      </ul>
    </div>
  );
}

export default Services;