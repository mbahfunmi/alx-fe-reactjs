// src/Home.jsx
import React from 'react';

function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f0f8ff', minHeight: 'calc(100vh - 120px)' }}>
      <h1 style={{ color: '#2c3e50', fontSize: '3em' }}>Welcome to Our Company</h1>
      <p style={{ color: '#34495e', fontSize: '1.2em', maxWidth: '800px', margin: '20px auto' }}>
        We are dedicated to delivering excellence in all our services. Explore our site to learn more about what we offer.
      </p>
    </div>
  );
}

export default Home;