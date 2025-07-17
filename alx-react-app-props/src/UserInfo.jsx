// src/UserInfo.jsx - Refactored (Removed userData prop)
import React from 'react';
import UserDetails from './UserDetails';

// Remove userData from props, as it's no longer needed here
function UserInfo() { // <--- REMOVED { userData } from props
  return <UserDetails />; // <--- REMOVED userData={userData}
}

export default UserInfo;