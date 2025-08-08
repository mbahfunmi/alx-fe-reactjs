// src/components/EditRecipeForm.jsx
import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, setIsEditing }) => {
  // Get the updateRecipe action from the store
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  // Local state for the form fields, initialized with current recipe data
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please enter both title and description.');
      return;
    }

    // Call the updateRecipe action with the new data
    updateRecipe({
      id: recipe.id, // Keep the original ID
      title,
      description
    });

    // Exit editing mode
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#333' }}>Edit Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        rows="7"
        required
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="submit"
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #007bff', backgroundColor: '#007bff', color: 'white' }}
        >
          Save Changes
        </button>
        <button
          type="button" // Important: type="button" to prevent form submission
          onClick={() => setIsEditing(false)}
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #6c757d', backgroundColor: '#6c757d', color: 'white' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
