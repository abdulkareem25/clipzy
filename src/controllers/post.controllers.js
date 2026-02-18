const mongoose = require('mongoose');
const uploadImage = require("../services/storage.service");
const Post = require("../models/post.model");

const createPost = async (req, res) => {
    const { buffer } = req.file;
    const { caption } = req.body;

    const result = await uploadImage(buffer);

    const post = await Post.create({
        imageUrl: result.url,
        caption,
        user: req.user.id
    });

    res.status(201).json({
        message: "Post created successfully.",
        post
    });
};

const getPosts = async (req, res) => {

    const user = req.user.id;

    const posts = await Post.find({ user }).populate('user', ['username', 'email']);

    res.status(200).json({
        message: "Posts retrieved successfully.",
        posts
    });
};

const getPost = async (req, res) => {

    const postId = req.params.id;

    const userId = req.user.id;

    if (!mongoose.isValidObjectId(postId)) {
        return res.status(400).json({
            message: "Invalid Post ID."
        });
    };

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found."
        });
    };

    const isValid = post.user.toString() === userId;

    if (!isValid) {
        return res.status(403).json({
            message: "You are not authorized to view this post."
        });
    };

    res.status(200).json({
        message: "Post retrieved successfully.",
        post
    });
};

module.exports = { createPost, getPosts, getPost };