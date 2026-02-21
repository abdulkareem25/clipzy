const { default: mongoose } = require("mongoose");

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post ID is required."]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required."]
    }
}, {
    timestamps: true
});

likeSchema.index({ postId: 1, userId: 1}, { unique: true });

const Like = mongoose.model('likes', likeSchema);

module.exports = Like;