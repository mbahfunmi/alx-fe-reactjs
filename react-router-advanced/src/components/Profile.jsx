import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Profile Details Component
function ProfileDetails() {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold">Profile Details</h3>
      <p>This is where you'd see personal information.</p>
    </div>
  );
}

// Profile Settings Component
function ProfileSettings() {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold">Profile Settings</h3>
      <p>Manage your account settings here.</p>
    </div>
  );
}

// Main Profile Page with Nested Routes
export function ProfilePage() {
  return (
    <div className="p-8 bg-purple-100 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold mb-4">Profile Section</h2>
      <p className="mb-4">This is the main profile page. Select a nested route below to see more.</p>
      <nav className="space-x-4 mb-4">
        <Link to="details" className="text-blue-600 hover:underline">Details</Link>
        <Link to="settings" className="text-blue-600 hover:underline">Settings</Link>
      </nav>

      {/* Nested routes are defined here */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}

// Export nested components for testing/checker
export { ProfileDetails, ProfileSettings };
