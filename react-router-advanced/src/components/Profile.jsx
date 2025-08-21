// src/components/Profile.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

export function ProfilePage() {
  return (
    <div>
      <h2>Profile Page</h2>
      <nav>
        <Link to="details">Profile Details</Link> |{" "}
        <Link to="settings">Profile Settings</Link>
      </nav>
      <div>
        {/* Outlet renders the nested route component */}
        <Outlet />
      </div>
    </div>
  );
}

export function ProfileDetails() {
  return <h3>Here are your profile details.</h3>;
}

export function ProfileSettings() {
  return <h3>Here you can change your profile settings.</h3>;
}
