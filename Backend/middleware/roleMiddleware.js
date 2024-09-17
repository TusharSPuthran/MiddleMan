const jwt = require('jsonwebtoken');
const User = require('../Models/User');  // Adjust the path as necessary

const SECRETE_KEY = "STUDENTS";

const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'No token provided' });

            const userId = jwt.verify(token, SECRETE_KEY);
            const user = await User.findById(userId);

            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = user;  // Attach user to request
            next();
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized', error });
        }
    };
};

module.exports = roleMiddleware;
