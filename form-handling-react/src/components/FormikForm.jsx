import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const API_URL = 'https://reqres.in/api/register'

const Schema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm your password'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
})

export default function FormikForm() {
  return (
    <div>
      <h2>Formik + Yup</h2>
      <p className="small">Formik manages state & validation; Yup defines the rules.</p>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        }}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
          try {
            setStatus({ success: '', error: '' })
            const res = await fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: values.email, password: values.password })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Registration failed')
            setStatus({ success: `Registered! Token/ID: ${data.token || data.id || 'N/A'}` })
            resetForm()
          } catch (err) {
            setStatus({ error: err.message })
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form noValidate>
            {status?.success && <div className="success" role="status" aria-live="polite">{status.success}</div>}
            {status?.error && <div className="error" role="alert" aria-live="assertive">{status.error}</div>}

            <div className="form-row">
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" type="text" />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>

            <div className="form-row">
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" type="text" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-row">
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-row">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field id="confirmPassword" name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>

            <div className="form-row">
              <label>
                <Field type="checkbox" name="terms" /> I accept the Terms & Conditions
              </label>
              <ErrorMessage name="terms" component="div" className="error" />
            </div>

            <div className="actions">
              <button className="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Register'}
              </button>
              <span className="small">Formik handles touched/dirty/errors for you</span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
