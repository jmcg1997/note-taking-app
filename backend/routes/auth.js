const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authController = require("../controllers/authController");

// Route to handle user registration
router.post("/register", authController.register);

// Route to handle user login
router.post("/login", authController.loginUser);

// Route to verify if a token is still valid
router.get("/verify", (req, res) => {
    
    // Extract the token from the Authorization header (if present)
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // If no token is found, the token is considered invalid
    if (!token) {
        return res.json({ valid: false });
    }

    try {
        // Attempt to verify the token using the server's secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true, userId: decoded.id }); // Token is valid
    } catch (error) {
        res.json({ valid: false }); // Token is invalid or expired
    }
});

// Export the router so it can be used in the main server file
module.exports = router;

