import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { ProfilePage, ProfileDetails, ProfileSettings } from './components/Profile.jsx';

// A simple utility to simulate authentication status.
let isUserAuthenticated = false;

// A component for the Home page.
function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <p className="text-lg">Welcome to the advanced routing demo!</p>
    </div>
  );
}

// A component for the About page.
function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About Page</h1>
      <p className="text-lg">Learn more about the app here.</p>
    </div>
  );
}

// A component to display a dynamic user dashboard.
function UserDashboard() {
  const { userId } = useParams();
  
  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold mb-2">User Dashboard</h2>
      <p className="text-lg">Showing content for user: <span className="font-mono text-blue-600">{userId}</span></p>
    </div>
  );
}

// The component for the Login page.
function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    isUserAuthenticated = true;
    onLogin(true);
    navigate('/profile');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>
      <p className="mb-4">You must be logged in to view your profile.</p>
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition-colors"
      >
        Log In
      </button>
    </div>
  );
}

// A simple component to handle redirects for protected routes.
function ProtectedRoute({ children }) {
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// The main application component that sets up all the routing.
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <nav className="bg-gray-800 text-white p-4 shadow-lg">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link to="/users/123" className="hover:text-gray-300">User 123</Link></li>
            <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
            {!isAuthenticated && <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>}
            {isAuthenticated && (
              <li>
                <button
                  onClick={() => {
                    isUserAuthenticated = false;
                    handleAuthChange(false);
                  }}
                  className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleAuthChange} />} />
            
            <Route path="/users/:userId" element={<UserDashboard />} />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
            
            <Route path="*" element={<h1 className="text-4xl text-center mt-12">404: Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}