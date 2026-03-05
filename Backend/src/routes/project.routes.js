const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const { createProject } = require('../controllers/project.controllers');

const router = express.Router();

router.post('/create', identifyUser, createProject);

module.exports = router;