const db = require("../db");

// Function to validate login time
const validateLoginTime = (lastLoginTimeInMillis) => {
  const now = Date.now();
  return lastLoginTimeInMillis >= now - 3600000 && lastLoginTimeInMillis <= now;
};

// Function to validate user login
const validateUserLogin = async (uuid) => {
  const getUserSql = "SELECT * FROM user WHERE uuid = ?";

  try {

    const [users] = await db.promise().query(getUserSql, [uuid]);

    if (users.length === 0) {
      return null; // User not found
    }

    const user = users[0];

    if (!validateLoginTime(user.lastLogin)) {
      throw new Error("Login expired. Please login again.");
    }

    return user; // Valid user object
  } catch (err) {
    throw err; // Let the caller handle errors
  }
};

// Usage example
// (async () => {
//   try {
//     const user = await validateUserLogin("some-uuid");
//     if (!user) {
//       console.log("User not found");
//     } else {
//       console.log("Valid user:", user);
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// })();

module.exports = { validateUserLogin };
