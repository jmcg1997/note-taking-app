const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("🔍 Authentication middleware executed");

    // ✅ Log all incoming headers for debugging
    console.log("🔍 Received headers:");
    console.table(req.headers);

    // Step 1: Check if Authorization header exists
    const authHeader = req.headers["authorization"];
    console.log("🔍 Authorization header received:", authHeader);

    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
        console.log("❌ No token provided or invalid format.");
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Step 2: Extract token from "Bearer <token>"
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2) {
        console.log("❌ Invalid Authorization header format.");
        return res.status(400).json({ message: "Invalid Authorization header format." });
    }

    const token = tokenParts[1].trim();
    console.log("🔑 Extracted token:", token);

    // Step 3: Check if JWT_SECRET is set in environment variables
    if (!process.env.JWT_SECRET) {
        console.error("❌ Server misconfiguration: JWT_SECRET is missing.");
        return res.status(500).json({ message: "Server error. JWT_SECRET not set." });
    }

    try {
        // Step 4: Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Attach the decoded user information to the request object
        req.user = decoded;
        console.log("✅ Valid token. User ID:", req.user.id);

        // ✅ Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("❌ JWT verification failed:", error);

        // 🔄 Handle specific JWT errors for better user feedback
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Access denied." });
        }

        // Generic fallback error message
        return res.status(401).json({ message: "Authentication failed." });
    }
};

