const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {

    const { name, email, password, username, bio, profilePicture } = req.body;

    const isExists = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (isExists) {
        return res.status(400).json({
            message: isExists.email === email && isExists.username === username ? "email and username are already exists."
                : isExists.email === email ? "email already exists."
                    : "username already exists."
        });
    };

    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        username,
        bio,
        profilePicture
    });

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(201).json({
        message: "User registered successfully.",
        user: {
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePicture: user.profilePicture
        },
        token
    });
};

const signIn = async (req, res) => {

    const { email, username, password } = req.body;

    const user = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (!user) {
        return res.status(409).json({
            message: "Invalid Credentials."
        });
    };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(409).json({
            message: "Invalid Credentials."
        });
    };

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(200).json({
        message: "User logged in successfully.",
        token
    });
};

const signOut = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: "User logged out successfully."
    });
};


module.exports = { signUp, signIn, signOut };