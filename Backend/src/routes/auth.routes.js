const express = require('express');
const { signUp, signIn, signOut, getUser } = require('../controllers/auth.controllers');
const identifyUser = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

router.post('/sign-out', identifyUser, signOut);

router.get('/get-user', identifyUser, getUser);

module.exports = router;