const jwt = require("jsonwebtoken");
const uploadImage = require("../services/storage.service");
const Post = require("../models/post.model");

const createPost = async (req, res) => {
    const { buffer } = req.file;
    const { caption } = req.body;
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Token not found. Please login to create a post."
        });
    };

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token. Please login again."
        });
    };

    const result = await uploadImage(buffer);

    const post = await Post.create({
        imageUrl: result.url,
        caption,
        user: decoded.id
    });

    res.status(201).json({
        message: "Post created successfully.",
        post
    });
};

const getPosts = async (req, res) => {

    const { token } = req.cookies;

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token.",
            error: err.message
        });
    };

    const user = decoded.id;

    const posts = await Post.find({ user }).populate('user', ['username', 'email']);

    res.status(200).json({
        message: "Posts retrieved successfully.",
        posts
    });
};
}

module.exports = { createPost, getPosts };