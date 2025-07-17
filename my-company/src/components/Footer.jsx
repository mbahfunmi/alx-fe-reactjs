// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '20px 0',
      fontSize: '0.9em',
      marginTop: 'auto', // Pushes footer to the bottom if content is short
      boxShadow: '0 -2px 5px rgba(0,0,0,0.2)'
    }}>
      <p>&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
    </footer>
  );
}

export default Footer;