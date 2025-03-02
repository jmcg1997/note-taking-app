const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) for the given user ID.
 * 
 * @param {string} id - The unique identifier of the user (usually the MongoDB ObjectId).
 * @returns {string} - A signed JWT token valid for 30 days.
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",  // Token will expire in 30 days
    });
};

// ✅ Export the function so it can be used in other files (like authController.js)
module.exports = generateToken;
