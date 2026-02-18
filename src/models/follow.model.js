const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    followeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

const Follow = mongoose.model('follows', followSchema);

module.exports = Follow;