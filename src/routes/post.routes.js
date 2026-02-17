const multer = require('multer');
const { Router } = require('express');
const { createPost, getPosts, getPost } = require('../controllers/post.controllers');

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/create-post', upload.single('image'), createPost);

router.get('/get-posts', getPosts);

router.get('/details/:id', getPost);

module.exports = router;