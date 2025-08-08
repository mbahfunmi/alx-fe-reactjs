// src/components/UserProfile.jsx

import profileImage from '../assets/profile.png';

function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg">
      <img
        className="rounded-full w-24 h-24 md:w-36 md:h-36 mx-auto"
        src={profileImage}
        alt="User"
      />
      <h1 className="text-lg md:text-xl text-blue-800 my-4">Mbah Ijeoma</h1>
      <p className="text-sm md:text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;