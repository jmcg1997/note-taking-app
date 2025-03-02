const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all note-related routes using the authMiddleware
// This ensures only authenticated users can access these endpoints

// GET /api/notes - Fetch all notes for the authenticated user
router.get("/", authMiddleware, noteController.getNotes);

// POST /api/notes - Create a new note
router.post("/", authMiddleware, noteController.createNote);

// GET /api/notes/:id - Fetch a specific note by ID
router.get("/:id", authMiddleware, noteController.getNoteById);

// PUT /api/notes/:id - Update a note by ID
router.put("/:id", authMiddleware, noteController.updateNote);

// DELETE /api/notes/:id - Delete a note by ID
router.delete("/:id", authMiddleware, noteController.deleteNote);

// ✅ Export the router so it can be used in the main server file
module.exports = router;
