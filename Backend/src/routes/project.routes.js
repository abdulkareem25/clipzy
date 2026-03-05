const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const { createProject, getProjects } = require('../controllers/project.controllers');

const router = express.Router();

router.post('/create-project', identifyUser, createProject);

router.get('/get-projects', identifyUser, getProjects);

module.exports = router;