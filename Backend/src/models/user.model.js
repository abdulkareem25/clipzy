const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: "https://ik.imagekit.io/abdulkareem25/default_pfp.jpg"
    },
});

const User = mongoose.model('users', userSchema);

module.exports = User;