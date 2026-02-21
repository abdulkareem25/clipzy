const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const { followRequest, unFollowUser, getFollowers, getFollowing, getPendingRequests, acceptFollowRequest, rejectFollowRequest } = require('../controllers/user.controllers');
const validateObjectId = require('../middlewares/validateObjectId.middleware');

const router = express.Router();

router.post(
    '/follow/request/:followeeId',
    validateObjectId('followeeId'),
    identifyUser,
    followRequest
);

router.get(
    '/follow/pending/',
    identifyUser,
    getPendingRequests
);

router.post(
    '/follow/accept/:followerId',
    validateObjectId('followerId'),
    identifyUser,
    acceptFollowRequest
);

router.post(
    '/follow/reject/:followerId',
    validateObjectId('followerId'),
    identifyUser,
    rejectFollowRequest
);

router.post(
    '/unfollow/:followeeId',
    validateObjectId('followeeId'),
    identifyUser,
    unFollowUser
);

router.get(
    '/followers/:followeeId',
    validateObjectId('followeeId'),
    identifyUser,
    getFollowers
);

router.get(
    '/following/:followerId',
    validateObjectId('followerId'),
    identifyUser,
    getFollowing
);

module.exports = router;