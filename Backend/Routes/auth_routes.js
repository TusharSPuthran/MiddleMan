const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Register, Login } = require("../Controllers/authController");  // Ensure this path and export are correct

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/register", upload.single('profile'), Register);
router.post("/login", Login);

module.exports = router;
