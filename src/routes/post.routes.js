const { Router } = require('express');
const { createPost } = require('../controllers/post.controllers');

const router = Router();

router.post('/create-post', createPost);

module.exports = router;