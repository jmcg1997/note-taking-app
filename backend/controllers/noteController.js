const Note = require("../models/Note"); // Import the Note model

// ✅ Get all notes
exports.getNotes = async (req, res) => {
  try {
    console.log("✅ Token received, user ID:", req.user.id);

    // 🔎 Fetch notes that belong to the authenticated user
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);  // Send notes as JSON response
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    // 🔎 Find note by its ID
    const note = await Note.findById(req.params.id);

    // If note is not found, return 404
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);  // Send note as JSON response
  } catch (error) {
    console.error("❌ Error fetching note by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate that title and content are provided
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Create new note linked to the authenticated user
    const newNote = new Note({
      title,
      content,
      user: req.user.id
    });

    // Save note in the database
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);  // Send saved note as response
  } catch (error) {
    console.error("❌ Error creating note:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Update a note by ID
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Require at least one field to update
    if (!title && !content) {
      return res.status(400).json({ message: "At least one field (title or content) is required" });
    }

    // Find note by ID
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this note" });
    }

    // Perform update and return the updated note
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // Return the updated document
    );

    res.status(200).json(updatedNote);  // Send updated note as response
  } catch (error) {
    console.error("❌ Error updating note:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete a note by ID
exports.deleteNote = async (req, res) => {
  try {
    // Find note by ID
    const note = await Note.findById(req.params.id);

    // If note is not found, return 404
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this note" });
    }

    // Delete the note from the database
    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

