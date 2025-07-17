// src/UserDetails.jsx - Refactored to Consume Context
import React, { useContext } from 'react'; // <--- NEW: Import useContext
import UserContext from './UserContext'; // <--- NEW: Import UserContext

// Remove userData from props as it will now be consumed from context
function UserDetails() {
  // Use the useContext hook to get the value from UserContext
  const userData = useContext(UserContext); // <--- NEW: Get userData from context

  // Add a check in case userData is null (e.g., if Provider is missing)
  if (!userData) {
    return <p>User data not available.</p>;
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#333' }}>User Details</h2>
      <p>Name: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{userData.name}</span></p>
      <p>Email: <span style={{ fontStyle: 'italic', color: '#6c757d' }}>{userData.email}</span></p>
    </div>
  );
}

export default UserDetails;