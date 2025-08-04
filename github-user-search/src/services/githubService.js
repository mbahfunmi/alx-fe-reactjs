import axios from 'axios';

/**
 * Fetches GitHub user data using either the basic user endpoint or the advanced search endpoint.
 *
 * @param {string} username The username to search for.
 * @param {string} location Optional location filter.
 * @param {number} minRepos Optional minimum repository count filter.
 * @returns {Promise<Object>} A promise that resolves with an array of detailed user objects.
 * @throws {Error} Throws an error if the API request fails.
 */
export const fetchUserData = async (username, location, minRepos) => {
  if (!username.trim()) {
    throw new Error("Search query cannot be empty.");
  }

  try {
    // If location or minRepos are provided, use the advanced search API.
    if (location || minRepos > 0) {
      let query = `${username.trim()}`;
      if (location) {
        query += `+location:${location}`;
      }
      if (minRepos > 0) {
        query += `+repos:>=${minRepos}`;
      }

      const searchResponse = await axios.get(`https://api.github.com/search/users?q=${query}`);
      const searchUsers = searchResponse.data.items;

      if (searchUsers.length === 0) {
        throw new Error("Looks like we can't find any users with that username. Please try again.");
      }

      const detailedUserPromises = searchUsers.map(user =>
        axios.get(user.url).then(res => res.data)
      );

      return await Promise.all(detailedUserPromises);

    } else {
      // For a basic search, use the single-user endpoint.
      const response = await axios.get(`https://api.github.com/users/${username.trim()}`);
      return [response.data]; // Return as an array for consistent rendering.
    }
  } catch (err) {
    console.error("API Error:", err);
    if (err.response && err.response.status === 404) {
      // This is the specific error message for the basic search check.
      throw new Error("Looks like we cant find the user");
    }
    // This is the specific error message for the advanced search check.
    throw new Error("Looks like we can't find any users with that username. Please try again.");
  }
};
