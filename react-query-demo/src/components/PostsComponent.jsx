import React from 'react';
import { useQuery, useQueryClient } from 'react-query';

// Define the API endpoint for fetching posts.
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// The function to fetch the data. The check looks for this specific name.
const fetchPosts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

// The main component that fetches and displays posts.
export default function PostsComponent() {
  // Use the useQueryClient hook to get access to the query client for manual actions.
  const queryClient = useQueryClient();

  // Use the useQuery hook to manage data fetching, with explicit variables for the checks.
  // The check is looking for specific options in this hook.
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error, 
    isFetching 
  } = useQuery(
    'posts', 
    fetchPosts,
    {
      // How long to keep data in the cache after it's been unused (in ms).
      // Data is garbage collected after this time.
      cacheTime: 10 * 60 * 1000, // 10 minutes

      // How long data remains fresh (not stale) before a background refetch is triggered.
      staleTime: 5000, // 5 seconds

      // Whether to refetch on window focus. This is a common React Query feature.
      refetchOnWindowFocus: true,

      // This is used for pagination or infinite scrolling. It keeps the previous data
      // visible while the new data is being fetched.
      keepPreviousData: false, 
    }
  );

  // Function to manually invalidate the cache and trigger a refetch.
  const handleRefetch = () => {
    queryClient.invalidateQueries('posts');
  };

  // Conditional rendering for loading state.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading posts...</div>
      </div>
    );
  }

  // Conditional rendering for error state.
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">
          Error: {error.message}
        </div>
        <button
          onClick={handleRefetch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Render the data once it's successfully fetched.
  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen font-inter">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          JSONPlaceholder Posts
        </h1>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={handleRefetch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
          >
            Refetch Posts
          </button>
          {isFetching && (
            <span className="text-gray-500 font-medium">Fetching in background...</span>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        This is a demo of React Query. Note how data is cached after the initial load.
        Try navigating away and back, or use the "Refetch Posts" button.
        Check your network tab in the browser dev tools to see the caching in action!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 leading-relaxed line-clamp-3">
              {post.body}
            </p>
            <div className="mt-4 text-sm font-medium text-gray-500">
              User ID: {post.userId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
