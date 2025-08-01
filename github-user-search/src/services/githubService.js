import axios from 'axios';

/**
 * Builds the query string for the GitHub Search API based on search parameters.
 * @param {string} username - The username to search for.
 * @param {string} location - The location to filter by.
 * @param {number} minRepos - The minimum number of public repositories.
 * @returns {string} The formatted query string.
 */
const buildSearchQuery = (username, location, minRepos) => {
  let query = username.trim();
  if (location.trim()) {
    query += `+location:${location.trim()}`;
  }
  if (minRepos > 0) {
    query += `+repos:>=${minRepos}`;
  }
  return query;
};

/**
 * Fetches user data from the GitHub Search API.
 * This function first gets a list of users, then it fetches detailed information for each user.
 * @param {string} username - The username to search for.
 * @param {string} location - The location to filter by.
 * @param {number} minRepos - The minimum number of public repositories.
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} perPage - The number of users per page.
 * @returns {Promise<Object>} A promise that resolves with an object containing the user results and a boolean indicating if there are more pages.
 */
export const fetchUsers = async (username, location, minRepos, pageNumber, perPage) => {
  const query = buildSearchQuery(username, location, minRepos);
  if (!query) {
    throw new Error("Search query cannot be empty.");
  }

  try {
    const searchResponse = await axios.get(`https://api.github.com/search/users?q=${query}`, {
      params: {
        per_page: perPage,
        page: pageNumber,
      },
    });

    const searchUsers = searchResponse.data.items;

    const detailedUserPromises = searchUsers.map(user =>
      axios.get(user.url).then(res => res.data)
    );

    const detailedUsers = await Promise.all(detailedUserPromises);

    const hasMore = searchUsers.length === perPage;

    return { users: detailedUsers, hasMore };
  } catch (err) {
    throw new Error("Looks like we can't find any users with those criteria.");
  }
};
