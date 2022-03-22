const apiUrl = "https://experis-noroff-api.herokuapp.com";
const apiKey = "2cdf30b3-079f-410a-bfc1-376b65de5b4e";

/**
 * Get the trivia categories from the Open Trivia Database.
 * @returns An array of trivia categories.
 */
export const getCategories = async () => {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Gets a user from the Noroff Experis Users API.
 * @param {String} userName - The name input by the user.
 * @returns An object representing the user.
 */
export const getUser = async (userName) => {
  try {
    const response = await fetch(`${apiUrl}/trivia?username=${userName}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

/**
 * Registers a user to the Noroff Experis Users API.
 * @param {String} userName - The name input by the user.
 * @returns An object representing the user.
 */
export const registerUserName = async (userName) => {
  try {
    const response = await fetch(`${apiUrl}/trivia`, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        highScore: 0,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates the users highScore.
 */
export const updateHighScore = async (userId, highScore) => {
  try {
    const response = await fetch(`${apiUrl}/trivia/${userId}`, {
      method: "PATCH",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        highScore,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
