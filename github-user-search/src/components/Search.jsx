import { useState } from 'react';
import { SearchIcon, Loader2, UserRound, MapPin, GitPullRequest } from 'lucide-react';
import { fetchUsers } from '../services/githubService';
import React from 'react';

// Reusable UI components for a consistent look
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-white text-gray-900 shadow-md ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (username.trim() || location.trim() || minRepos > 0) {
      setLoading(true);
      setError(null);
      setPage(1);

      try {
        const { users, hasMore } = await fetchUsers(username, location, minRepos, 1, perPage);
        setSearchResults(users);
        setHasMore(hasMore);
      } catch (err) {
        setError(err.message);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    setError(null);

    try {
      const { users, hasMore } = await fetchUsers(username, location, minRepos, nextPage, perPage);
      setSearchResults(prevResults => [...prevResults, ...users]);
      setHasMore(hasMore);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
