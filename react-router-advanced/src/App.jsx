import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
  Navigate,
} from 'react-router-dom';

// A simple utility to simulate authentication status.
// In a real app, this would be managed via Context or a state management library.
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
  // useParams allows us to access dynamic segments of the URL.
  const { userId } = useParams();
  
  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold mb-2">User Dashboard</h2>
      <p className="text-lg">Showing content for user: <span className="font-mono text-blue-600">{userId}</span></p>
    </div>
  );
}

// This component acts as a container for nested routes.
// The <Outlet /> component is crucial here to render child routes.
function ProfilePage() {
  return (
    <div className="p-8 bg-purple-100 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold mb-4">Profile Section</h2>
      <p className="mb-4">This is the main profile page. Select a nested route below to see more.</p>
      <nav className="space-x-4 mb-4">
        <Link to="/profile/details" className="text-blue-600 hover:underline">Details</Link>
        <Link to="/profile/settings" className="text-blue-600 hover:underline">Settings</Link>
      </nav>
      {/* Outlet renders the child route's component here */}
      <div className="mt-4 border-t-2 border-purple-300 pt-4">
        <Outlet />
      </div>
    </div>
  );
}

// A nested component for profile details.
function ProfileDetails() {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold">Profile Details</h3>
      <p>This is where you'd see personal information.</p>
    </div>
  );
}

// Another nested component for profile settings.
function ProfileSettings() {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold">Profile Settings</h3>
      <p>Manage your account settings here.</p>
    </div>
  );
}

// The component for the Login page.
function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    isUserAuthenticated = true;
    onLogin(true); // Update the parent component's state
    navigate('/profile'); // Redirect to a protected page after login
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
// If the user is authenticated, it renders the child route; otherwise, it redirects to login.
function ProtectedRoute({ children }) {
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// The main application component that sets up all the routing.
export default function App() {
  // Use state to force re-render on auth status change.
  // This is a simple way to demonstrate protected routes.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // A function to update the authentication state.
  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Navigation Bar */}
        <nav className="bg-gray-800 text-white p-4 shadow-lg">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            {/* Link to a dynamic route */}
            <li><Link to="/users/123" className="hover:text-gray-300">User 123</Link></li>
            {/* Link to a protected route */}
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

        {/* The main routing container */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleAuthChange} />} />
            
            {/* Dynamic Route: The ':userId' is a dynamic segment */}
            <Route path="/users/:userId" element={<UserDashboard />} />

            {/* Protected and Nested Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              {/* Nested Routes inside the <ProfilePage /> */}
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
            
            {/* Fallback route for 404 Not Found */}
            <Route path="*" element={<h1 className="text-4xl text-center mt-12">404: Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
