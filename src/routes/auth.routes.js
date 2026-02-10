const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const router = express.Router();

router.post('/sign-up', async (req, res) => {

    const { email, password, username, bio, profilePicture } = req.body;

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

    const user = await User.create({
        email,
        password: crypto.createHash('sha256').update(password).digest('hex'),
        username,
        bio,
        profilePicture
    });

    const payload = {
        id: user._id
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('jwt_token', token);

    res.status(201).json({
        message: "User registered successfully.",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePicture: user.profilePicture
        },
        token
    });
});

module.exports = router;