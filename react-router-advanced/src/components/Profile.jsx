// src/components/Profile.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";

function ProfileDetails() {
  return <h3>Here are your profile details.</h3>;
}

function ProfileSettings() {
  return <h3>Here you can change your profile settings.</h3>;
}

export function ProfilePage() {
  return (
    <div>
      <h2>Profile Page</h2>
      <nav>
        <Link to="details">Profile Details</Link> |{" "}
        <Link to="settings">Profile Settings</Link>
      </nav>

      {/* ✅ Nested routes go here */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
