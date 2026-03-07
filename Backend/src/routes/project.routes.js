const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId.middleware');
const { createProject, 
  getProjects, 
  getProject, 
  updateProject, 
  deleteProject } = require('../controllers/project.controllers');

const router = express.Router();

router.post('/create-project', identifyUser, createProject);

router.get('/get-projects', identifyUser, getProjects);

router.get('/details/:projectId', identifyUser, validateObjectId('projectId'), getProject);

router.patch('/update/:projectId', identifyUser, validateObjectId('projectId'), updateProject);

router.delete('/delete/:projectId', identifyUser, validateObjectId('projectId'), deleteProject);

module.exports = router;