import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockRecipes from '../data.json';

const RecipeDetail = () => {
  // useParams() is a hook from React Router that gives us access to
  // URL parameters. In this case, the 'id' from the '/recipe/:id' route.
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find the recipe with the matching ID.
    // The ID from useParams is a string, so we convert it to a number
    // for a strict comparison (===) with the recipe.id, which is a number.
    const foundRecipe = mockRecipes.find(r => r.id === parseInt(id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      // Handle the case where no recipe is found.
      setRecipe(null);
    }
  }, [id]);

  // If the recipe is not found, display a "not found" message.
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-4xl font-bold text-red-500">Recipe Not Found</h1>
        <p className="mt-4 text-gray-600">The recipe you are looking for does not exist.</p>
        <Link to="/" className="mt-6 text-blue-600 hover:underline">
          Go back to Home Page
        </Link>
      </div>
    );
  }

  // If the recipe is found, display its details.
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* A link to go back to the home page */}
      <Link to="/" className="inline-block text-blue-600 hover:underline mb-4">
        &lt; Back to all recipes
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:p-10 md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-700 mb-6">{recipe.summary}</p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
