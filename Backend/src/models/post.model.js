const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
        required: true
    },
    imageUrl: {
        type: String,
        required: [true, "ImageUrl is required."],
    },
    caption: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;