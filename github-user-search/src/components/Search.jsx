import { useState } from 'react';
import axios from 'axios';
import { SearchIcon, Loader2, UserRound, Users, GitPullRequest, MapPin, Link as LinkIcon, Building } from 'lucide-react';
import React from 'react';

// Reusable UI components for a consistent look
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

const Avatar = ({ src, alt, fallback, className = '' }) => (
  <div className={`relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full ${className}`}>
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
 * Builds the query string for the GitHub Search API based on search parameters.
 * @param {string} username - The username to search for.
 * @param {string} location - The location to filter by.
 * @param {number} minRepos - The minimum number of public repositories.
 * @returns {string} The formatted query string.
 */
const buildSearchQuery = (username, location, minRepos) => {
  let query = username.trim();
  if (location.trim()) {
    query += `+location:${location.trim()}`;
  }
  if (minRepos > 0) {
    query += `+repos:>=${minRepos}`;
  }
  return query;
};

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const perPage = 10;

  /**
   * Fetches user data from the GitHub Search API.
   * Handles both initial search and pagination for "Load More".
   * @param {number} pageNumber - The page number to fetch.
   * @param {boolean} isInitialSearch - Flag to indicate if this is a new search.
   */
  const fetchUsers = async (pageNumber, isInitialSearch = false) => {
    setLoading(true);
    setError(null);

    const query = buildSearchQuery(username, location, minRepos);

    if (!query) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: query,
          per_page: perPage,
          page: pageNumber,
        },
      });

      const newUsers = response.data.items;
      setSearchResults(prevResults => isInitialSearch ? newUsers : [...prevResults, ...newUsers]);
      setHasMore(newUsers.length === perPage);
    } catch (err) {
      setError("Looks like we can't find any users with those criteria.");
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim() || location.trim() || minRepos > 0) {
      setPage(1); // Reset page for a new search
      fetchUsers(1, true); // Perform an initial search
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(nextPage);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <Input
            type="text"
            placeholder="Username (e.g., torvalds)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Location (e.g., Nigeria)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Min Repositories"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            min="0"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
          <span className="ml-2">Search Users</span>
        </Button>
      </form>

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

      {searchResults.length > 0 && (
        <div className="space-y-6 mt-8">
          {searchResults.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar src={user.avatar_url} alt={`${user.login}'s avatar`} fallback={<UserRound size={32} />} />
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-xl">{user.login}</h4>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline transition-colors"
                  >
                    View Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
          {hasMore && (
            <div className="text-center mt-6">
              <Button onClick={handleLoadMore} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                <span className="ml-2">Load More</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

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
