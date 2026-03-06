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

async function getProject(req, res) {
  const { projectId } = req.params;
  const project = await Project.findById(projectId)
    .populate('userId', 'fullName email');

  if (!project) {
    return res.status(404).json({
      message: "Project not found."
    });
  };

  res.status(200).json({
    message: "Project retrieved successfully.",
    project
  });
};

async function updateProject(req, res) {
  const { projectId } = req.params;
  const { description } = req.body;

  const project = await Project.findByIdAndUpdate(
    projectId,
    { description },
    { new: true }
  );

  if (!project) {
    return res.status(404).json({
      message: "Project not found or you don't have permission to update it."
    });
  };

  res.status(200).json({
    message: "Project updated successfully.",
    project
  });
};

async function deleteProject(req, res) {
  const { projectId } = req.params;
  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    return res.status(404).json({
      message: "Project not found or you don't have permission to delete it."
    });
  };

  res.status(200).json({
    message: "Project deleted successfully."
  });
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
};