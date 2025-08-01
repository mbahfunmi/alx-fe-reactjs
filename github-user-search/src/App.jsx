import Search from './components/Search';
import './index.css';
import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center justify-start font-sans">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          GitHub User Search
        </h1>
        <p className="text-md text-gray-600 mt-2">
          Find users by username, location, and repository count.
        </p>
      </header>
      <main className="w-full max-w-4xl">
        <Search />
      </main>
    </div>
  );
};

export default App;