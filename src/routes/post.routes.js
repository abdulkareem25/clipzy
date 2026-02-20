const multer = require('multer');
const { Router } = require('express');
const { createPost, getPosts, getPost, likePost } = require('../controllers/post.controllers');
const identifyUser = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId.middleware');

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/create-post', upload.single('image'), identifyUser, createPost);

router.get('/get-posts', identifyUser, getPosts);

router.get('/details/:postId', validateObjectId('postId'), identifyUser, getPost);

router.post('/like/:postId', validateObjectId('postId'), identifyUser, likePost);

module.exports = router;