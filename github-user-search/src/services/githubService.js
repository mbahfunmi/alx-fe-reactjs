import axios from 'axios';

/**
 * Fetches user data from the GitHub API using a provided username.
 * @param {string} user The GitHub username to search for.
 * @returns {Promise<object>} A promise that resolves with the user data.
 */
export const fetchUserData = async (user) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`);
    return response.data;
  } catch (err) {
    // Axios throws an error for non-2xx status codes, including 404.
    // We check for a 404 to provide a specific error message.
    if (err.response && err.response.status === 404) {
      throw new Error("User not found");
    }
    throw err;
  }
};
