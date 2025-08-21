import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from 'react-query'; // Using the import name requested, though @tanstack/react-query is the modern standard

// Initialize the QueryClient outside of the component.
// This client will be responsible for fetching, caching, and updating data.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set a stale time to demonstrate caching. The data is considered fresh for 5 seconds.
      // After this time, it will be refetched in the background on a new mount or window focus.
      staleTime: 5000,
    },
  },
});

// A simple fetcher function that gets the posts from the API.
// This is the function passed to the useQuery hook.
const getPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

// This is the main component that fetches and displays the posts.
// It uses the useQuery hook to manage the data fetching lifecycle.
function PostsComponent() {
  // Access the query client to manually trigger a refetch if needed.
  const client = useQueryClient();

  // The useQuery hook is the core of React Query.
  // It takes a unique query key ('posts') and a fetcher function.
  // It returns an object with state information like data, isLoading, isError, and error.
  const { data: posts, status, error, isFetching } = useQuery('posts', getPosts);

  // A function to manually trigger a refetch of the 'posts' query.
  // This is useful for user-initiated data updates.
  const handleRefetch = () => {
    client.invalidateQueries('posts');
  };

  // --- Conditional Rendering based on the query status ---
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading posts...</div>
      </div>
    );
  }

  if (status === 'error') {
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

  // --- Data Display ---
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

// Main App component that wraps the PostsComponent in the QueryClientProvider.
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
    </QueryClientProvider>
  );
}
