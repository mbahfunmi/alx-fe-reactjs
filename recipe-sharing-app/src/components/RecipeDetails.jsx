// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm'; // Will be created next
import DeleteRecipeButton from './DeleteRecipeButton'; // Will be created next

const RecipeDetails = () => {
  // useParams hook to get the recipeId from the URL
  const { recipeId } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Convert recipeId from string (from URL) to number
  const id = parseInt(recipeId, 10);

  // Select the specific recipe from the store
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === id)
  );

  // State to toggle between viewing details and editing form
  const [isEditing, setIsEditing] = React.useState(false);

  // If recipe is not found (e.g., invalid ID in URL), redirect
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '20px auto', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      {isEditing ? (
        // Render the EditRecipeForm when isEditing is true
        <EditRecipeForm recipe={recipe} setIsEditing={setIsEditing} />
      ) : (
        // Render recipe details when not editing
        <>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>{recipe.title}</h1>
          <p style={{ color: '#666', lineHeight: '1.6' }}>{recipe.description}</p>

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
