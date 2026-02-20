const uploadImage = require("../services/storage.service");
const Post = require("../models/post.model");
const Like = require("../models/like.model");

const createPost = async (req, res) => {
    const { buffer } = req.file;
    const { caption } = req.body;
    const { userId } = req.user;

    const result = await uploadImage(buffer);

    const post = await Post.create({
        imageUrl: result.url,
        caption,
        userId
    });

    res.status(201).json({
        message: "Post created successfully.",
        post
    });
};

const getPosts = async (req, res) => {

    const { userId } = req.user;

    const posts = await Post.find({ userId }).populate('userId', ['username', 'email']);

    res.status(200).json({
        message: "Posts retrieved successfully.",
        posts
    });
};

const getPost = async (req, res) => {

    const { postId } = req.params;

    const { userId } = req.user;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found."
        });
    };

    const isValid = post.userId.toString() === userId;

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

const likePost = async (req, res) => {
    
    const { postId } = req.params;
    const { userId } = req.user;

    const isPostExists = await Post.findById(postId);

    if(!isPostExists) {
        return res.status(404).json({
            message: "Post Not Found."
        });
    };

    const isLiked = await Like.findOne({
        postId,
        userId
    });

    if(isLiked) {
        return res.status(400).json({
            message: "You have already liked this post."
        });
    };

    await Like.create({
        postId,
        userId
    });

    return res.status(201).json({
        message: "Post liked successfully."
    });
};

module.exports = { createPost, getPosts, getPost, likePost };