// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Simulated authentication hook
function useAuth() {
  // For now, just return true/false to simulate login
  const [isAuthenticated] = React.useState(true); 
  return { isAuthenticated };
}

export function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    // Redirect to home (or login) if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
}
