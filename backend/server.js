require("dotenv").config(); // Load environment variables from .env file
console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db"); // Import database connection function

const app = express();

// Connect to MongoDB
connectDB();

// Middleware CORS with options
const corsOptions = {
  origin: "http://localhost:5004", // Allowed origin (frontend)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Authorization", "Content-Type"], // Allowed headers
  credentials: true // Allow sending cookies and authorization headers
};
app.use(cors(corsOptions));

// Middleware JSON
app.use(express.json());

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "../frontend/public")));

// ✅ Import routes and middleware
const noteRoutes = require("./routes/notes");        // Notes-related API routes
const authRoutes = require("./routes/auth");         // Authentication API routes
const authMiddleware = require("./middleware/authMiddleware"); // Middleware for protected routes
const Note = require("./models/Note");               // Note model
const User = require("./models/User");               // User model

// Debugging: Log all incoming requests
app.use((req, res, next) => {
  console.log(`🔍 Request received: ${req.method} ${req.url}`);
  console.log("🔍 Headers:", req.headers);
  next();
});

// ✅ Setup main API routes
app.use("/api/auth", authRoutes);     // Authentication (login, register)
app.use("/api/notes", noteRoutes);     // CRUD operations for notes

// Render the login page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

// Render the notes page
app.get("/notes", (req, res) => {
  res.render("notes");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// ✅ Start server on defined PORT (default to 5004 if not specified)
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
