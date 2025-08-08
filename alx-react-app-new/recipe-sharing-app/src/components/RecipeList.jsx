// src/components/RecipeList.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const recipes = useRecipeStore(state => state.recipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);
  const favorites = useRecipeStore(state => state.favorites); // Get favorites
  const addFavorite = useRecipeStore(state => state.addFavorite); // Action
  const removeFavorite = useRecipeStore(state => state.removeFavorite); // Action

  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  // Function to toggle favorite status
  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Your Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          {useRecipeStore.getState().searchTerm ? "No recipes match your search criteria." : "No recipes added yet. Add some delicious recipes!"}
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                position: 'relative', // For absolute positioning of favorite button
                backgroundColor: '#fff'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)'; }}
            >
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <h3 style={{ color: '#007bff', marginBottom: '8px' }}>{recipe.title}</h3>
                <p style={{ color: '#555', fontSize: '0.95em', maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {recipe.description}
                </p>
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); toggleFavorite(recipe.id); }} // Prevent link navigation
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: favorites.includes(recipe.id) ? '#ffc107' : '#ccc', // Gold if favorited, grey if not
                  fontSize: '1.8em',
                  padding: '5px',
                  lineHeight: '1',
                  borderRadius: '50%',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={favorites.includes(recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
              >
                &#9733; {/* Unicode star character */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
