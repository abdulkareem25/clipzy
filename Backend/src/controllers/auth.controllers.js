const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uploadImage = require('../services/storage.service');

const signUp = async (req, res) => {

    const { fullName, email, password, username, bio } = req.body;

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

    let profilePictureUrl = '';

    if (req.file) {
        const result = await uploadImage(req.file.buffer, 'temp');
        profilePictureUrl = result.url;
    }

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        username,
        bio,
        profilePicture: profilePictureUrl
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
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePicture: user.profilePicture
        }
    });
};

const signIn = async (req, res, next) => {

    const { email, username, password } = req.body;

    const user = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select('+password');

    if (!user) {
        const error = new Error("User Not Found.");
        error.statusCode = 404;

        return next(error);
    };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(400).json({
            message: "Invalid Credentials."
        });
    };

    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_SECRET,
        { expiresIn: '15m' }
    )

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60
    });
    res.cookie('access_token', accessToken, {
        maxAge: 15 * 60 * 60
    });

    //update user refresh token in database

    const updatedUser = await User.updateOne(
        { _id: user._id },
        { $set: { refresh_token: token } },
        { new: true });

    res.status(200).json({
        message: "User logged in successfully.",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePicture: user.profilePicture
        }
    });
};

const signOut = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: "User logged out successfully."
    });
};

const getUser = async (req, res) => {

    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    res.status(200).json({
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePicture: user.profilePicture
        }
    });
};

const refreshToken = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(401).json({
        message: "Unathorized"
    });

    const isValid = await jwt.verify(user.refresh_token, process.env.JWT_SECRET);

    if (!isValid) return res.status(401).json({
        message: "Invalid Token."
    });

    const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const accessToken = await jwt.sign(
        { _id: user._id },
        process.env.ACCESS_SECRET,
        { expiresIn: '15m' }
    );

    await User.updateOne(
        { _id: user._id },
        { $set: { refresh_token: token } }
    );

    res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 });
    res.cookie('access_token', accessToken, { maxAge: 15 * 60 * 60 });

    return res.status(200).json({
        message: "Token Refreshed Successfully."
    })
};

module.exports = { signUp, signIn, signOut, getUser, refreshToken };