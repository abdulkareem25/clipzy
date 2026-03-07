const uploadImage = require("../services/storage.service");
const Post = require("../models/post.model");
const Like = require("../models/like.model");

const createPost = async (req, res) => {
    const { buffer } = req.file;
    const { caption, projectId } = req.body;
    const { userId } = req.user;

    const result = await uploadImage(buffer, userId);

    const post = await Post.create({
        imageUrl: result.url,
        caption,
        userId,
        projectId
    });

    res.status(201).json({
        message: "Post created successfully.",
        post
    });
};

const getPosts = async (req, res) => {
    
    const posts = await Post.find().populate('userId', ['fullName', 'email']);

    res.status(200).json({
        message: "Posts retrieved successfully.",
        posts
    });
};

const getPostsByUserId = async (req, res) => {

    const { userId } = req.params;

    const posts = await Post.find({ userId }).populate('userId', ['fullName', 'email']);

    res.status(200).json({
        message: "Posts retrieved successfully.",
        posts
    });
};

const getPostsByProjectId = async (req, res) => {

    const { projectId } = req.params;
    const posts = await Post.find({ projectId }).populate('userId', ['fullName', 'email']);

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

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found."
        });
    };

    const isLiked = await Like.findOne({
        postId,
        userId
    });

    if (isLiked) {
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

const disLikePost = async (req, res) => {

    const { postId } = req.params;
    const { userId } = req.user;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found."
        });
    };

    const isLiked = await Like.findOne({
        postId,
        userId
    });

    if (!isLiked) {
        return res.status(400).json({
            message: "You have not liked this post."
        });
    };

    await Like.findOneAndDelete({
        postId,
        userId
    });

    return res.status(200).json({
        message: "Post disliked successfully."
    });
};

module.exports = {
    createPost,
    getPosts,
    getPostsByUserId,
    getPostsByProjectId,
    getPost,
    likePost,
    disLikePost
};