// src/components/UserProfile.jsx - MODIFIED to consume UserContext
import React, { useContext } from 'react';
import UserContext from './UserContext'; // <--- Corrected path: assuming UserContext.js is also in src/components

function UserProfile() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: 'blue' }}>User Profile: {userData.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}>{userData.age}</span></p>
      <p>Bio: {userData.bio}</p>
      <p style={{ color: 'green', fontSize: '0.8em' }}> (Data consumed via Context API in UserProfile)</p>
    </div>
  );
}

export default UserProfile;