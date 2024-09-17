const express = require("express");
const router = express.Router();
const { uploadVideo, reviewVideo, approveVideo } = require("../Controllers/videoController");

// Middleware for authentication (to be implemented in middleware/auth.js)
const { authenticate, authorizeRole } = require("../middleware/auth");

// Route for uploading a video (only accessible by Creator role)
router.post(
  "/upload", 
  authenticate, 
  authorizeRole("Creator"),  // Only creators can upload
  uploadVideo
);

// Route for reviewing a video (only accessible by Editor role)
router.post(
  "/review/:id", 
  authenticate, 
  authorizeRole("Editor"),  // Only editors can review
  reviewVideo
);

// Route for approving a video (accessible by both Creator and Editor, depending on workflow)
router.post(
  "/approve/:id", 
  authenticate, 
  authorizeRole("Creator", "Editor"),  // Both creators and editors can approve based on role
  approveVideo
);

module.exports = router;
