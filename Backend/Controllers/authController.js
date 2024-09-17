const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../Models/User");  // Ensure correct path to model

const SECRETE_KEY = "STUDENTS";

const Register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        let checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            res.status(400).json({ message: "Email already exists!" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            let newUser = new User({
                username,
                email,
                password: hashedPassword,
                role
            });
            let savedUser = await newUser.save();
            res.status(201).json({
                success: true,
                message: "New user registered successfully",
                user: savedUser
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({ message: "Email or Password Invalid!" });
        } else {
            let checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                res.status(400).json({ message: "Email or Password Invalid!" });
            } else {
                let token = jsonwebtoken.sign({ id: user._id }, SECRETE_KEY, { expiresIn: '1h' });
                res.status(200).json({
                    message: "Login successful!",
                    success: true,
                    loggedInUser: user,
                    authToken: token
                });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { Register, Login };