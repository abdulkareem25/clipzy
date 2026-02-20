const Follow = require("../models/follow.model");
const User = require("../models/user.model");

async function followUser(req, res) {
    
    const { followeeId } = req.params;
    const followerId = req.user.userId;

    const isfolloweeExist = await User.findById(followeeId);

    if(!isfolloweeExist) {
        return res.status(400).json({
            message: "User you are trying to follow does not exist."
        });
    };

    if (followerId === followeeId) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    };

    const isFollowing = await Follow.findOne({
        followerId,
        followeeId
    });

    if (isFollowing) {
        return res.status(400).json({
            message: "You are already following this user."
        });
    };

    const followRecord = await Follow.create({
        followerId,
        followeeId
    });

    res.status(201).json({
        message: "User followed successfully.",
        followRecord
    });
};

async function unFollowUser(req, res) {
  
    const { followeeId } = req.params;
    const followerId = req.user.userId;

};

module.exports = { followUser };