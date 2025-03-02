const mongoose = require("mongoose");

// ✅ Define the schema for a User document in MongoDB
const userSchema = new mongoose.Schema({
  // Username - required, must be unique, and will be trimmed to remove unnecessary spaces
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Email - required, must be unique, and will be trimmed
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Password - required (hashed before saving)
  password: {
    type: String,
    required: true
  },
  // Timestamp when the user is created (defaults to current date)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Create and export the User model
module.exports = mongoose.model("User", userSchema);

