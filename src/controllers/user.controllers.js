const Follow = require("../models/follow.model");
const User = require("../models/user.model");

async function followUser(req, res) {

    const { followeeId } = req.params;
    const followerId = req.user.userId;

    const isfolloweeExist = await User.findById(followeeId);

    if (!isfolloweeExist) {
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
        followeeId,
        status: 'pending'
    });

    res.status(201).json({
        message: "Follow request sent.",
        followRecord
    });
};

async function unFollowUser(req, res) {

    const { followeeId } = req.params;
    const followerId = req.user.userId;

    const isFolloweeExist = await User.findById(followeeId);

    if (!isFolloweeExist) {
        return res.status(400).json({
            message: "User you are trying to unfollow does not exist."
        });
    };

    if (followerId === followeeId) {
        return res.status(400).json({
            message: "You cannot unfollow yourself"
        });
    };

    const isFollowing = await Follow.findOne({
        followeeId,
        followerId,
        status: 'accepted'
    });

    if (isFollowing) {
        await Follow.findOneAndDelete({
            followeeId,
            followerId
        });
    };

    res.status(200).json({
        message: "User unfollowed successfully."
    });
};

async function getFollowers(req, res) {

    const { followeeId } = req.params;

    const user = await User.findById(followeeId);

    if (!user) {
        return res.status(400).json({
            message: "User does not exist."
        });
    };

    const followers = await Follow.find({ followeeId, status: 'accepted' })
        .populate("followerId", "name profilePicture");

    if (followers.length === 0) {
        return res.status(200).json({
            message: "This user has no followers."
        });
    };

    res.status(200).json({
        message: "Followers retrieved successfully.",
        followers
    });
};

module.exports = { followUser, unFollowUser, getFollowers };