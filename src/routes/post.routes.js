const multer = require('multer');
const { Router } = require('express');
const { createPost } = require('../controllers/post.controllers');

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/create-post', upload.single('image'), createPost);

module.exports = router;