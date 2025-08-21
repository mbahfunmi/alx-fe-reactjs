import { useState } from 'react'
import ControlledForm from './components/ControlledForm.jsx'
import FormikForm from './components/FormikForm.jsx'

export default function App() {
  const [mode, setMode] = useState('controlled') // 'controlled' | 'formik'

  return (
    <div className="container">
      <h1>React Form Handling</h1>
      <p className="sub">Start with controlled components, then upgrade to Formik + Yup.</p>

      <div className="nav">
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

      {mode === 'controlled' ? <ControlledForm /> : <FormikForm />}
    </div>
  )
}
