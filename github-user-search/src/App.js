import { useState } from 'react';
import axios from 'axios';
import { SearchIcon, Loader2, UserRound, Users, GitPullRequest, MapPin, Link as LinkIcon, Building } from 'lucide-react';

// Reusable UI components to create a clean, modern look.
// These are similar to components from a library like shadcn/ui.

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-white text-gray-900 shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-semibold tracking-tight text-2xl ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
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

const Avatar = ({ src, alt, fallback, className = '' }) => (
  <div className={`relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full ${className}`}>
    {/* Image with fallback if it fails to load */}
    <img src={src} alt={alt} className="aspect-square h-full w-full" onError={(e) => { e.target.style.display = 'none'; }} />
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
      {fallback}
    </div>
  </div>
);

const AvatarFallback = ({ children }) => (
  <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
    {children}
  </span>
);

// The core application component
const App = () => {
  // State variables for managing the application's data and UI state
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches user data from the GitHub API using a provided username.
   * This function encapsulates the API call logic.
   * @param {string} user The GitHub username to search for.
   * @returns {Promise<object>} A promise that resolves with the user data.
   */
  const fetchUserData = async (user) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user}`);
      return response.data;
    } catch (err) {
      // Axios throws an error for non-2xx status codes, including 404.
      // We check for a 404 to provide a specific error message.
      if (err.response && err.response.status === 404) {
        throw new Error("User not found");
      }
      throw err;
    }
  };

  /**
   * Handles the form submission event. This is the main function that
   * orchestrates the search process.
   * @param {Event} e The form submission event.
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return; // Don't search for empty input

    // Reset states and start loading
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      // Call the API function
      const data = await fetchUserData(username);
      // If successful, set the user data
      setUserData(data);
    } catch (err) {
      // If an error occurs, set the error message
      setError("Looks like we can't find the user.");
      console.error("API error:", err);
    } finally {
      // This block always runs, whether the API call succeeded or failed
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          GitHub User Search
        </h1>
        {/* Search form with input and button */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-8">
          <Input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
            <span className="ml-2 hidden md:inline">Search</span>
          </Button>
        </form>

        {/* Conditional rendering for different application states */}
        {loading && (
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

        {userData && (
          <Card className="w-full mt-8 animate-fade-in-up">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-4">
                <Avatar src={userData.avatar_url} alt={`${userData.login}'s avatar`}>
                  <AvatarFallback><UserRound size={32} /></AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name || userData.login}</CardTitle>
                  <CardDescription>@{userData.login}</CardDescription>
                </div>
              </div>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={`View ${userData.login}'s GitHub profile`}
              >
                <LinkIcon className="h-6 w-6" />
              </a>
            </CardHeader>
            <CardContent>
              {userData.bio && (
                <p className="text-base mb-4">{userData.bio}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4" />
                  <span>{userData.followers} Followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{userData.following} Following</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4" />
                  <span>{userData.public_repos} Public Repos</span>
                </div>
                {userData.company && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{userData.company}</span>
                  </div>
                )}
                {userData.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{userData.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;

// CSS for the fade-in animation, added directly for a self-contained example
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
