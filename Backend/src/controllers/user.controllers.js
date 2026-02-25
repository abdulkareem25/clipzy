const Follow = require("../models/follow.model");
const User = require("../models/user.model");

async function followRequest(req, res) {

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

    const isPending = await Follow.findOne({
        followerId,
        followeeId,
        status: 'pending'
    });

    if (isPending) {
        return res.status(400).json({
            message: "Follow request already sent and is pending approval."
        });
    };

    const isFollowing = await Follow.findOne({
        followerId,
        followeeId,
        status: 'accepted'
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

async function getPendingRequests(req, res) {
    const { userId } = req.user;

    const requests = await Follow.find({ followeeId: userId, status: "pending" })
        .populate("followerId", "fullName profilePicture");

    if (!requests) {
        return res.status(200).json({
            message: "No pending follow requests."
        });
    };

    res.status(200).json({
        message: "Pending follow requests retrieved successfully.",
        requests
    });

};

async function acceptFollowRequest(req, res) {

    const { userId } = req.user;
    const { followerId } = req.params;

    const follower = await User.findById(followerId);

    if (!follower) {
        return res.status(400).json({
            message: "User does not exist."
        });
    };

    const request = await Follow.findOne({ followeeId: userId, followerId, status: "pending" });

    if (!request) {
        return res.status(400).json({
            message: "No pending follow request from this user."
        });
    };

    request.status = "accepted";
    await request.save();

    res.status(200).json({
        message: "Follow request accepted."
    });

};

async function rejectFollowRequest(req, res) {

    const { userId } = req.user;
    const { followerId } = req.params;

    const follower = await User.findById(followerId);

    if (!follower) {
        return res.status(400).json({
            message: "User does not exist."
        });
    };

    const request = await Follow.findOne({ followeeId: userId, followerId, status: "pending" });

    if (!request) {
        return res.status(400).json({
            message: "No pending follow request from this user."
        });
    };

    await Follow.findByIdAndDelete(request._id);

    res.status(200).json({
        message: "Follow request rejected."
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

    const request = await Follow.findOne({
        followeeId,
        followerId,
        status: 'accepted'
    });

    if (!request) {
        return res.status(400).json({
            message: "You are not following this user."
        });
    };

    await Follow.findByIdAndDelete(request._id);

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
        .populate("followerId", "fullName profilePicture");

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

async function getFollowing(req, res) {

    const { followerId } = req.params;

    const user = await User.findById(followerId);

    if (!user) {
        return res.status(400).json({
            message: "User does not exist."
        });
    };

    const following = await Follow.find({ followerId, status: 'accepted' })
        .populate("followeeId", "fullName profilePicture");

    if (following.length === 0) {
        return res.status(200).json({
            message: "This user is not following anyone."
        });
    };

    res.status(200).json({
        message: "Following retrieved successfully.",
        following
    });
};

module.exports = {
    followRequest,
    getPendingRequests,
    acceptFollowRequest,
    rejectFollowRequest,
    unFollowUser,
    getFollowers,
    getFollowing
};