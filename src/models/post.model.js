const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "ImageUrl is required."],
    },
    caption: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;