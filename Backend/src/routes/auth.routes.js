const express = require('express');
const multer = require('multer');
const { signUp, signIn, signOut, getUser } = require('../controllers/auth.controllers');
const identifyUser = require('../middlewares/auth.middleware');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/sign-up', upload.single('profilePicture'), signUp);

router.post('/sign-in', signIn);

router.post('/sign-out', identifyUser, signOut);

router.get('/get-user', identifyUser, getUser);

module.exports = router;