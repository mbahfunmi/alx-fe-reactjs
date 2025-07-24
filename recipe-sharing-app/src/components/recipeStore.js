    // src/components/recipeStore.js
    import { create } from 'zustand';

    const useRecipeStore = create(set => ({
      recipes: [], // Holds all recipes
      searchTerm: '', // New state for the current search term
      filteredRecipes: [], // New state for recipes after filtering
      favorites: [], // New state: array of recipe IDs that are favorited
      recommendations: [], // New state: array of recommended recipe objects

      /**
       * Action to add a new recipe to the store.
       * Also re-filters recipes and updates recommendations.
       * @param {object} newRecipe - The new recipe object to add.
       */
      addRecipe: (newRecipe) => set(state => {
        const updatedRecipes = [...state.recipes, newRecipe];
        const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
        // Re-generate recommendations after adding a new recipe
        const newRecommendations = generateRecommendationsLogic(updatedRecipes, state.favorites);
        return {
          recipes: updatedRecipes,
          filteredRecipes: updatedFilteredRecipes,
          recommendations: newRecommendations
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
        // Generate recommendations when recipes are set
        const newRecommendations = generateRecommendationsLogic(newRecipes, state.favorites);
        return {
          recipes: newRecipes,
          filteredRecipes: filtered,
          recommendations: newRecommendations
        };
      }),

      /**
       * Action to delete a recipe by its ID.
       * Also re-filters recipes and updates recommendations.
       * @param {number} recipeId - The ID of the recipe to delete.
       */
      deleteRecipe: (recipeId) => set(state => {
        const updatedRecipes = state.recipes.filter(recipe => recipe.id !== recipeId);
        // Re-filter after deletion
        const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
        // Also remove from favorites if it was favorited
        const updatedFavorites = state.favorites.filter(id => id !== recipeId);
        // Re-generate recommendations after deletion
        const newRecommendations = generateRecommendationsLogic(updatedRecipes, updatedFavorites);
        return {
          recipes: updatedRecipes,
          filteredRecipes: updatedFilteredRecipes,
          favorites: updatedFavorites,
          recommendations: newRecommendations
        };
      }),

      /**
       * Action to update an existing recipe.
       * Also re-filters recipes and updates recommendations.
       * @param {object} updatedRecipe - The recipe object with updated details (must include ID).
       */
      updateRecipe: (updatedRecipe) => set(state => {
        const updatedRecipes = state.recipes.map(recipe =>
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        );
        const updatedFilteredRecipes = updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
        // Re-generate recommendations after update
        const newRecommendations = generateRecommendationsLogic(updatedRecipes, state.favorites);
        return {
          recipes: updatedRecipes,
          filteredRecipes: updatedFilteredRecipes,
          recommendations: newRecommendations
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
       */
      filterRecipes: () => set(state => {
        const lowerCaseTerm = state.searchTerm.toLowerCase();
        const filtered = state.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(lowerCaseTerm) ||
          recipe.description.toLowerCase().includes(lowerCaseTerm)
        );
        return { filteredRecipes: filtered };
      }),

      /**
       * Action to add a recipe to favorites.
       * @param {number} recipeId - The ID of the recipe to favorite.
       */
      addFavorite: (recipeId) => set(state => {
        // Only add if not already in favorites
        if (!state.favorites.includes(recipeId)) {
          const updatedFavorites = [...state.favorites, recipeId];
          // Re-generate recommendations after favorite change
          const newRecommendations = generateRecommendationsLogic(state.recipes, updatedFavorites);
          return {
            favorites: updatedFavorites,
            recommendations: newRecommendations
          };
        }
        return {}; // No state change if already favorited
      }),

      /**
       * Action to remove a recipe from favorites.
       * @param {number} recipeId - The ID of the recipe to remove from favorites.
       */
      removeFavorite: (recipeId) => set(state => {
        const updatedFavorites = state.favorites.filter(id => id !== recipeId);
        // Re-generate recommendations after favorite change
        const newRecommendations = generateRecommendationsLogic(state.recipes, updatedFavorites);
        return {
          favorites: updatedFavorites,
          recommendations: newRecommendations
        };
      }),

      /**
       * Action to generate personalized recipe recommendations.
       * This logic is now extracted into a helper function for reusability.
       */
      generateRecommendations: () => set(state => {
        const newRecommendations = generateRecommendationsLogic(state.recipes, state.favorites);
        return { recommendations: newRecommendations };
      })
    }));

    /**
     * Helper function to generate recommendations.
     * This is a mock implementation: it recommends up to 3 random recipes that are NOT currently favorited.
     * In a real app, this would involve more sophisticated logic (e.g., categories, ingredients, user history).
     * @param {Array<object>} allRecipes - The full list of recipes.
     * @param {Array<number>} favoriteIds - The IDs of favorited recipes.
     * @returns {Array<object>} An array of recommended recipe objects.
     */
    const generateRecommendationsLogic = (allRecipes, favoriteIds) => {
      const nonFavoritedRecipes = allRecipes.filter(recipe => !favoriteIds.includes(recipe.id));

      // Shuffle the non-favorited recipes
      const shuffled = [...nonFavoritedRecipes].sort(() => 0.5 - Math.random());

      // Return up to 3 random non-favorited recipes
      return shuffled.slice(0, 3);
    };

    export default useRecipeStore;
    