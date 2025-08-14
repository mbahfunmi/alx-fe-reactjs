import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();

  // State to hold form data, now with 'steps' instead of 'instructions'
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '', // Corrected state key
    image: ''
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes, using destructuring from e.target
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Simple validation logic, updated for 'steps'
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required.';
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    }
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required.';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('New Recipe Submitted:', formData);
      alert('Recipe submitted successfully! (Check the console)');
    } else {
      console.log('Form validation failed.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link to="/" className="inline-block text-blue-600 hover:underline mb-4">
        &lt; Back to all recipes
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Add a New Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., Classic Beef Burgers"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Ingredients Field */}
          <div>
            <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">Ingredients (one per line)</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., 1 lb ground beef&#10;1/2 tsp salt"
            ></textarea>
            {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
          </div>

          {/* Preparation Steps Field */}
          <div>
            <label htmlFor="steps" className="block text-gray-700 font-semibold mb-2">Preparation Steps (one per line)</label>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows="7"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., 1. Mix ingredients together.&#10;2. Form patties."
            ></textarea>
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
          </div>
          
          {/* Image URL Field */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g., https://images.unsplash.com/your-image"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
