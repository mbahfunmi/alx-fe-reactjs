import React from 'react';
import { Outlet, Link } from 'react-router-dom';

// This component acts as a container for nested routes.
// The <Outlet /> component is crucial here to render child routes.
export function ProfilePage() {
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
export function ProfileDetails() {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold">Profile Details</h3>
      <p>This is where you'd see personal information.</p>
    </div>
  );
}

// Another nested component for profile settings.
export function ProfileSettings() {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold">Profile Settings</h3>
      <p>Manage your account settings here.</p>
    </div>
  );
}