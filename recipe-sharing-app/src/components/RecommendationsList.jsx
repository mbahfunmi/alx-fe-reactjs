// src/components/FavoritesList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore'; // Ensure correct import path

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes); // Get all recipes
  const favorites = useRecipeStore(state => state.favorites); // Get favorite IDs
  const removeFavorite = useRecipeStore(state => state.removeFavorite); // Action to remove favorite

  // Map favorite IDs to actual recipe objects
  const favoriteRecipes = favorites.map(id =>
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean); // Filter out any undefined if a favorite ID doesn't match a recipe

  return (
    <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #ffc107', paddingBottom: '10px', marginBottom: '20px' }}>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>You haven't favorited any recipes yet!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {favoriteRecipes.map(recipe => (
            <div
              key={recipe.id}
              style={{
                border: '1px solid #f8e7b9',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#fffbe6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                position: 'relative'
              }}
            >
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <h3 style={{ color: '#d39e00', marginBottom: '8px' }}>{recipe.title}</h3>
                <p style={{ color: '#777', fontSize: '0.9em', maxHeight: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {recipe.description}
                </p>
              </Link>
              <button
                onClick={() => removeFavorite(recipe.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#dc3545',
                  fontSize: '1.5em',
                  padding: '5px',
                  lineHeight: '1',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Remove from Favorites"
              >
                &times; {/* HTML entity for a multiplication sign / cross */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
