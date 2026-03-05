const Project = require("../models/project.model");
const User = require("../models/user.model");

async function createProject(req, res) {
  const { title, description } = req.body;
  const { userId } = req.user;

  const isExists = await Project.findOne({ title, userId });

  if (isExists) {
    return res.status(400).json({
      message: "Project with this title already exists."
    });
  };

  const project = await Project.create({
    title,
    description,
    userId
  });

  res.status(201).json({
    message: "Project created successfully.",
    project
  });
};

async function getProjects(req, res) {
  const { userId } = req.user;

  const projects = await Project.find({ userId })
    .populate('userId', 'fullName email');

  if (!projects) {
    return res.status(404).json({
      message: "No projects found."
    });
  };

  res.status(200).json({
    message: "Projects retrieved successfully.",
    projects
  });
};

module.exports = { createProject, getProjects };