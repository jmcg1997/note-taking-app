const bcrypt = require("bcrypt");             // Library to hash and compare passwords
const User = require("../models/User");       // User model to interact with the database
const generateToken = require("../utils/generateToken"); // Utility to generate JWT tokens

// ✅ Controller to handle user registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);

    // Send success response with token and user details
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      username: newUser.username
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for the authenticated user
    const token = generateToken(user._id);

    // ✅ Send success response with token and username
    res.status(200).json({
      token,
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};