const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    followeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

followSchema.index({ followerId: 1, followeeId: 1 }, { unique: true });

const Follow = mongoose.model('follows', followSchema);

module.exports = Follow;