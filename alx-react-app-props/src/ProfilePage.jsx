// src/ProfilePage.jsx - Refactored (Removed userData prop)
import React from 'react';
import UserInfo from './UserInfo';

// Remove userData from props, as it's no longer needed here
function ProfilePage() { // <--- REMOVED { userData } from props
  return <UserInfo />; // <--- REMOVED userData={userData}
}

export default ProfilePage;