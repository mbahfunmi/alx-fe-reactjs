// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#34495e',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'white' }}>
        MyCompany
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#1abc9c'} onMouseOut={(e) => e.target.style.color = 'white'}>Home</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#1abc9c'} onMouseOut={(e) => e.target.style.color = 'white'}>About</Link>
        <Link to="/services" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#1abc9c'} onMouseOut={(e) => e.target.style.color = 'white'}>Services</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#1abc9c'} onMouseOut={(e) => e.target.style.color = 'white'}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;