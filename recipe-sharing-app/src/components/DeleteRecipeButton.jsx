// src/components/DeleteRecipeButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  // Get the deleteRecipe action from the store
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate(); // For redirecting after deletion

  const handleDelete = () => {
    // Basic confirmation before deleting
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      // After deleting, navigate back to the home page (recipe list)
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #dc3545', backgroundColor: '#dc3545', color: 'white' }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
