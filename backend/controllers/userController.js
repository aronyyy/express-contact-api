const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide username, email, and password');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`user created ${user}`);

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('Invalid email or password');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            }
        }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
        

// @access private
const currentUser = asyncHandler(async (req, res) => {
    // Assuming you have some authentication middleware that sets req.user
    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json({
        _id: req.user.id,
        username: req.user.username,
        email: req.user.email
    });
});


module.exports = {
    registerUser,
    loginUser,
    currentUser
};