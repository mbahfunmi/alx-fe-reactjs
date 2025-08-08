// src/components/UserProfile.jsx

// 1. Import your image
import profileImage from '../assets/profile.png';

function UserProfile() {
  return (
    <div className="bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg">
      <img
        className="rounded-full w-36 h-36 mx-auto"
        // 2. Use the imported image in the src attribute
        src={profileImage}
        alt="User"
      />
      <h1 className="text-xl text-blue-800 my-4"> Mbah Ijeoma</h1>
      <p className="text-gray-600 text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;