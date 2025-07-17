// src/App.jsx - Final Refactored Code
import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';
import './App.css';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>
      {/* Now ProfilePage doesn't need to receive userData as a prop */}
      <ProfilePage /> {/* <--- REMOVED userData={userData} */}
    </UserContext.Provider>
  );
}

export default App;