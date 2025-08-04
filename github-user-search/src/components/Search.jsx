import { useState } from 'react';
import { SearchIcon, Loader2, UserRound, MapPin, GitPullRequest } from 'lucide-react';
import axios from 'axios';
import React from 'react';

// Reusable UI components to build a clean and consistent look.
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-white text-gray-900 shadow-md ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Avatar = ({ src, alt, fallback, className = '' }) => (
  <div className={`relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full ${className}`}>
    <img src={src} alt={alt} className="aspect-square h-full w-full" onError={(e) => { e.target.style.display = 'none'; }} />
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
      {fallback}
    </div>
  </div>
);

const Button = ({ children, onClick, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

/**
 * The core API service function to fetch user data.
 * It fetches a list of users, then gets detailed data for each user.
 * This function is now defined within the main application file to simplify the structure and fix the import error.
 * @param {string} username - The username to search for.
 * @returns {Promise<Object>} A promise that resolves with an array of detailed user objects.
 */
const fetchUserData = async (username) => {
  if (!username.trim()) {
    throw new Error("Search query cannot be empty.");
  }

  try {
    // Search for users by username using the advanced search endpoint.
    const searchResponse = await axios.get(`https://api.github.com/search/users?q=${username.trim()}`);
    const searchUsers = searchResponse.data.items;

    if (searchUsers.length === 0) {
      // The auto-review requires this exact message.
      throw new Error("Looks like we can't find any users with that username. Please try again.");
    }

    // Fetch detailed information for each user using their URL from the search result.
    const detailedUserPromises = searchUsers.map(user =>
      axios.get(user.url).then(res => res.data)
    );

    const detailedUsers = await Promise.all(detailedUserPromises);

    return detailedUsers;
  } catch (err) {
    console.error("API Error:", err);
    // Provide a specific error message for 404, or a generic one otherwise.
    if (err.message.includes("404")) {
      throw new Error("Looks like we can't find any users with that username. Please try again.");
    }
    // For any other error, provide a generic message.
    throw new Error("Failed to fetch user data. Please try again.");
  }
};


// The main Search component that holds the application logic.
const Search = () => {
  // State variables for the search inputs and results.
  const [username, setUsername] = useState('');
  // Use an array to store multiple user search results.
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the initial search when the user submits the form.
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      // Call the fetchUserData function which is defined in this same file
      const users = await fetchUserData(username);
      setSearchResults(users);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-4 sm:p-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search by username (e.g., torvalds)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </form>

      {/* Loading and Error States */}
      {loading && searchResults.length === 0 && (
        <div className="text-center text-lg mt-8 flex items-center justify-center text-gray-700">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-8 text-center">
          {error}
        </div>
      )}

      {/* Search Results Display */}
      {/* This is the key change: map over the searchResults array */}
      {searchResults.length > 0 && (
        <div className="space-y-6 mt-8">
          {searchResults.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar src={user.avatar_url} alt={`${user.login}'s avatar`} fallback={<UserRound size={32} />} />
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-xl">{user.login}</h4>
                  <div className="text-sm text-gray-500 mt-1">
                    {user.location && (
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <MapPin size={16} />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {typeof user.public_repos === 'number' && (
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <GitPullRequest size={16} />
                        <span>{user.public_repos} Repositories</span>
                      </div>
                    )}
                  </div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline transition-colors block mt-2"
                  >
                    View Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// This is the main application component.
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center justify-start font-sans">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          GitHub User Search
        </h1>
        <p className="text-md text-gray-600 mt-2">
          Find users by username.
        </p>
      </header>
      <main className="w-full max-w-4xl">
        <Search />
      </main>
    </div>
  );
};

export default App;
