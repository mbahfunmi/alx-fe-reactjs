// src/components/recipeStore.js
import { create } from 'zustand'; // Note the curly braces {}

const useRecipeStore = create(set => ({
  recipes: [], // Initial state: an empty array to hold recipes

  /**
   * Action to add a new recipe to the store.
   * @param {object} newRecipe - The new recipe object to add.
   */
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe]
  })),

  /**
   * Action to set the entire recipe list. Useful for initial loading.
   * @param {Array<object>} recipes - An array of recipe objects.
   */
  setRecipes: (recipes) => set({ recipes }),

  /**
   * Action to delete a recipe by its ID.
   * @param {number} recipeId - The ID of the recipe to delete.
   */
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),

  /**
   * Action to update an existing recipe.
   * @param {object} updatedRecipe - The recipe object with updated details (must include ID).
   */
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  }))
}));

export default useRecipeStore;