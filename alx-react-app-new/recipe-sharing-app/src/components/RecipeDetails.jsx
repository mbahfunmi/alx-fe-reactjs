// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(recipeId, 10);

  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === id)
  );
  const favorites = useRecipeStore(state => state.favorites); // Get favorites
  const addFavorite = useRecipeStore(state => state.addFavorite); // Action
  const removeFavorite = useRecipeStore(state => state.removeFavorite); // Action

  const [isEditing, setIsEditing] = React.useState(false);

  // Function to toggle favorite status
  const toggleFavorite = () => {
    if (favorites.includes(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe not found!</h2>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #007bff', backgroundColor: '#007bff', color: 'white' }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '20px auto', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      {isEditing ? (
        <EditRecipeForm recipe={recipe} setIsEditing={setIsEditing} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h1 style={{ color: '#333', margin: 0 }}>{recipe.title}</h1>
            <button
              onClick={toggleFavorite}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: favorites.includes(recipe.id) ? '#ffc107' : '#ccc',
                fontSize: '2.5em',
                padding: '0',
                lineHeight: '1',
                transition: 'color 0.2s ease, transform 0.2s ease'
              }}
              title={favorites.includes(recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
            >
              &#9733; {/* Unicode star character */}
            </button>
          </div>
          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>{recipe.description}</p>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #28a745', backgroundColor: '#28a745', color: 'white' }}
            >
              Edit Recipe
            </button>
            <DeleteRecipeButton recipeId={recipe.id} />
          </div>
          <button
            onClick={() => navigate('/')}
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #6c757d', backgroundColor: '#6c757d', color: 'white' }}
          >
            Back to List
          </button>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
