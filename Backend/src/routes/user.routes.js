const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const { directFollow, followRequest, unFollowUser, getFollowers, getFollowing, getPendingRequests, acceptFollowRequest, rejectFollowRequest, checkFollowStatus, getUserById, updateUserProfile } = require('../controllers/user.controllers');
const validateObjectId = require('../middlewares/validateObjectId.middleware');

const router = express.Router();

router.post(
    '/follow/request/:followeeId',
    validateObjectId('followeeId'),
    identifyUser,
    followRequest
);

router.post(
    '/follow/:followeeId',
    validateObjectId('followeeId'),
    identifyUser,
    directFollow
);

router.get(
    '/follow/check/:followeeId',
    validateObjectId('followeeId'),
    identifyUser,
    checkFollowStatus
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

router.get(
    '/:userId',
    validateObjectId('userId'),
    identifyUser,
    getUserById
);

router.put(
    '/profile',
    identifyUser,
    updateUserProfile
);

module.exports = router;