const multer = require('multer');
const { Router } = require('express');
const { createPost, getPosts } = require('../controllers/post.controllers');

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/create-post', upload.single('image'), createPost);

router.get('/get-posts', getPosts)

module.exports = router;