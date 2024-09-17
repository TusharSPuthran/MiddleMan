const jwt = require("jsonwebtoken");
const userSchema = require("../Models/User"); // Adjust path if necessary
const SECRET_KEY = "STUDENTS"; // Use an environment variable in production

// Middleware to authenticate the user by verifying the token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // Expecting token in Authorization header
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userSchema.findById(decoded);

    if (!user) {
      return res.status(401).json({ message: "Invalid token or user not found." });
    }

    req.user = user; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }
};

// Middleware to authorize user based on role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRole };
