// src/App.jsx
import React, { useState } from 'react';
import ControlledForm from './components/ControlledForm.jsx';
import FormikForm from './components/FormikForm.jsx'; // Make sure this file is named .jsx

import './App.css';

export default function App() {
  // This state belongs here, in the parent App component
  const [mode, setMode] = useState('controlled');

  return (
    <div className="container">
      <h1>React Form Handling</h1>
      <p className="sub">Start with controlled components, then upgrade to Formik + Yup.</p>
      
      <div className="nav">
        {/* The navigation buttons also belong here */}
        <button
          onClick={() => setMode('controlled')}
          className={mode === 'controlled' ? 'active' : ''}
        >
          Controlled Components
        </button>
        <button
          onClick={() => setMode('formik')}
          className={mode === 'formik' ? 'active' : ''}
        >
          Formik + Yup
        </button>
      </div>

      {/* Conditional rendering to show the correct form */}
      {mode === 'controlled' ? <ControlledForm /> : <FormikForm />}
    </div>
  );
}
