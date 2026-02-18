const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const { followUser } = require('../controllers/user.controllers');
const validateObjectId = require('../middlewares/validateObjectId.middleware');

const router = express.Router();

router.post('/follow/:followeeId', validateObjectId('followeeId'), identifyUser, followUser);

module.exports = router;