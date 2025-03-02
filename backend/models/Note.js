const mongoose = require("mongoose");

// ✅ Define the schema for a Note document in MongoDB
const noteSchema = new mongoose.Schema({
  // Note title - required and trimmed to remove unnecessary spaces
  title: {
    type: String,
    required: true,
    trim: true
  },
  // Note content - required field
  content: {
    type: String,
    required: true
  },
  // Reference to the user who owns this note (relational field)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Timestamp when the note is created (defaults to current date)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Create and export the Note model
module.exports = mongoose.model("Note", noteSchema);

