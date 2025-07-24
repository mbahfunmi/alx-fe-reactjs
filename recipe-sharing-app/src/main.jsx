// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { BrowserRouter } from 'react-router-dom'; // REMOVE THIS IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* REMOVE BrowserRouter wrapper */}
    <App />
  </React.StrictMode>,
);
