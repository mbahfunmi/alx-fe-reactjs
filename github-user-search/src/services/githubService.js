import axios from 'axios';

/**
 * Fetches GitHub user data based on a username search query.
 * It first searches for users, then gets detailed profile information for each.
 * @param {string} username The username to search for.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of detailed user objects.
 * @throws {Error} Throws an error if the search query is empty or if the API request fails.
 */
export const fetchUserData = async (username) => {
  // Ensure the search query is not empty before making the API call
  if (!username.trim()) {
    throw new Error("Search query cannot be empty.");
  }

  try {
    // 1. Search for users by the provided username using the GitHub Search API
    const searchResponse = await axios.get(`https://api.github.com/search/users?q=${username.trim()}`);
    const searchUsers = searchResponse.data.items;

    // 2. For each user found, fetch their detailed profile information
    // We use Promise.all to run these requests concurrently for better performance
    const detailedUserPromises = searchUsers.map(user =>
      axios.get(user.url).then(res => res.data)
    );

    // 3. Wait for all detailed user requests to complete
    const detailedUsers = await Promise.all(detailedUserPromises);

    // 4. Return the array of detailed user objects
    return detailedUsers;
  } catch (err) {
    console.error("API Error:", err);
    // Provide a user-friendly error message
    throw new Error("Looks like we can't find any users with that username. Please try again.");
  }
};
