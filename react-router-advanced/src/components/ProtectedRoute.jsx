// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// You can pass "isAuthenticated" as a prop
export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
