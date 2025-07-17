// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import router components

// Import our page components
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

// Import our Navbar and Footer components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Basic App.css to reset some default browser styles for better appearance
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar /> {/* Navbar appears on all pages */}

        <main style={{ flex: 1 }}> {/* Main content area */}
          <Routes> {/* Defines the areas where routes will be rendered */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            {/* Optional: A catch-all route for 404 pages */}
            <Route path="*" element={<h1 style={{ textAlign: 'center', padding: '50px' }}>404 - Page Not Found</h1>} />
          </Routes>
        </main>

        <Footer /> {/* Footer appears on all pages */}
      </div>
    </BrowserRouter>
  );
}

export default App;