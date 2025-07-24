// src/components/recipeStore.js
import { create } from 'zustand'; // Ensure 'create' is imported as a named export

const useRecipeStore = create(set => ({
  recipes: [], // Holds all recipes
  searchTerm: '', // New state for the current search term
  filteredRecipes: [], // New state for recipes after filtering

  /**
   * Action to add a new recipe to the store.
   * @param {object} newRecipe - The new recipe object to add.
   */
  addRecipe: (newRecipe) => set(state => {
    const updatedRecipes = [...state.recipes, newRecipe];
    // After adding, re-filter the recipes to include the new one if it matches the search
    const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase()) // Also search in description
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedFilteredRecipes
    };
  }),

  /**
   * Action to set the entire recipe list. Useful for initial loading.
   * Also triggers filtering after setting recipes.
   * @param {Array<object>} newRecipes - An array of recipe objects.
   */
  setRecipes: (newRecipes) => set(state => {
    // Filter immediately after setting the main recipe list
    const filtered = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: newRecipes,
      filteredRecipes: filtered
    };
  }),

  /**
   * Action to delete a recipe by its ID.
   * @param {number} recipeId - The ID of the recipe to delete.
   */
  deleteRecipe: (recipeId) => set(state => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== recipeId);
    // Re-filter after deletion
    const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedFilteredRecipes
    };
  }),

  /**
   * Action to update an existing recipe.
   * @param {object} updatedRecipe - The recipe object with updated details (must include ID).
   */
  updateRecipe: (updatedRecipe) => set(state => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    // Re-filter after update
    const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedFilteredRecipes
    };
  }),

  /**
   * Action to update the search term.
   * This action also triggers the filtering of recipes immediately.
   * @param {string} term - The new search term.
   */
  setSearchTerm: (term) => set(state => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseTerm) ||
      recipe.description.toLowerCase().includes(lowerCaseTerm)
    );
    return {
      searchTerm: term,
      filteredRecipes: filtered
    };
  }),

  /**
   * Action to explicitly trigger filtering based on the current search term.
   * This might be less used now that setSearchTerm triggers it, but useful if recipes
   * are loaded asynchronously or changed outside of direct add/update/delete.
   */
  filterRecipes: () => set(state => {
    const lowerCaseTerm = state.searchTerm.toLowerCase();
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseTerm) ||
      recipe.description.toLowerCase().includes(lowerCaseTerm)
    );
    return { filteredRecipes: filtered };
  })
}));

export default useRecipeStore;
