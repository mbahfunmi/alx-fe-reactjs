// src/components/SearchBar.jsx
import React from 'react';
import useRecipeStore from './recipeStore'; // Ensure correct import path

const SearchBar = () => {
  // Get the setSearchTerm action from the store
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '12px 15px',
          borderRadius: '25px',
          border: '1px solid #ddd',
          fontSize: '1em',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          outline: 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
        }}
        onFocus={(e) => { e.target.style.borderColor = '#007bff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.25)'; }}
        onBlur={(e) => { e.target.style.borderColor = '#ddd'; e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'; }}
      />
    </div>
  );
};

export default SearchBar;
