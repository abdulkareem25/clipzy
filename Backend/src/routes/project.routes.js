const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const { createProject, getProjects, getProjectById } = require('../controllers/project.controllers');
const validateObjectId = require('../middlewares/validateObjectId.middleware');

const router = express.Router();

router.post('/create-project', identifyUser, createProject);

router.get('/get-projects', identifyUser, getProjects);

router.get('/details/:projectId', identifyUser, validateObjectId('projectId'), getProjectById);

module.exports = router;