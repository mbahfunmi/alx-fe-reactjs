// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Your Recipes</h2>
      {recipes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>No recipes added yet. Add some delicious recipes!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {recipes.map(recipe => (
            <Link
              to={`/recipe/${recipe.id}`} // Link to the recipe details page
              key={recipe.id}
              style={{
                textDecoration: 'none', // Remove underline from link
                color: 'inherit',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                display: 'block' // Make the whole div clickable
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)'; }}
            >
              <h3 style={{ color: '#007bff', marginBottom: '8px' }}>{recipe.title}</h3>
              <p style={{ color: '#555', fontSize: '0.95em', maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {recipe.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
