const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const { followUser, unFollowUser, getFollowers } = require('../controllers/user.controllers');
const validateObjectId = require('../middlewares/validateObjectId.middleware');

const router = express.Router();

router.post(
    '/follow/:followeeId',
    validateObjectId('followeeId'),
    identifyUser,
    followUser
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

module.exports = router;