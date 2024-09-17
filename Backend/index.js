const express = require('express');
const ConnectToMongo = require('./db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initialize the Express app
const app = express();
ConnectToMongo();  // Connect to MongoDB

// Middleware
app.use(express.json());
app.use(cors());

// Setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/videos/');  // Adjust the folder for video uploads
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes
const PORT = 7000;

// Authentication routes
app.use('/api/auth', require('./Routes/auth_routes'));  // Auth routes for register, login

// Video collaboration routes
app.use('/api/videos', require('./Routes/video_routes'));  // Video upload, review, approval

// Static file serving
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
