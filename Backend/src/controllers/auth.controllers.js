const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uploadImage = require('../services/storage.service');

const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
};

const setAuthCookies = (res, refreshToken, accessToken) => {
    res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000
    });
};

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

    const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_SECRET,
        { expiresIn: '15m' }
    );

    await User.updateOne(
        { _id: user._id },
        { $set: { refresh_token: refreshToken } }
    );
    setAuthCookies(res, refreshToken, accessToken);

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

    const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_SECRET,
        { expiresIn: '15m' }
    )

    await User.updateOne(
        { _id: user._id },
        { $set: { refresh_token: refreshToken } }
    );
    setAuthCookies(res, refreshToken, accessToken);

    res.status(200).json({
        message: "User logged in successfully.",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            bio: user.bio
        }
    });
};

const signOut = async (req, res) => {
    await User.updateOne(
        { _id: req.user._id },
        { $unset: { refresh_token: 1 } }
    );
    res.clearCookie('refreshToken', cookieOptions);
    res.clearCookie('accessToken', cookieOptions);
    res.status(200).json({
        message: "User logged out successfully."
    });
};

const getUser = async (req, res) => {

    const user = await User.findById(req.user._id);

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
            bio: user.bio
        }
    });
};

const refreshToken = async (req, res) => {
    const presentedRefreshToken = req.cookies.refreshToken;

    if (!presentedRefreshToken) return res.status(401).json({
        message: "Refresh token is missing."
    });

    let decoded;
    try {
        decoded = jwt.verify(presentedRefreshToken, process.env.JWT_SECRET);
    } catch {
        return res.status(401).json({
            message: "Invalid or expired refresh token."
        });
    }

    const userId = decoded._id || decoded.userId;
    if (!userId) return res.status(401).json({
        message: "Invalid Token."
    });

    const user = await User.findById(userId);
    if (!user || user.refresh_token !== presentedRefreshToken) {
        return res.status(401).json({
            message: "Invalid refresh token."
        });
    }

    const refreshToken = await jwt.sign(
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
        { $set: { refresh_token: refreshToken } }
    );

    setAuthCookies(res, refreshToken, accessToken);

    return res.status(200).json({
        message: "Token Refreshed Successfully."
    })
};

module.exports = { signUp, signIn, signOut, getUser, refreshToken };