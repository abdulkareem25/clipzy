const Project = require("../models/project.model");

async function createProject(req, res) {
  const { title, description } = req.body;
  const { userId } = req.user;

  const isExists = await Project.findOne({ title, userId });

  if (isExists) {
    return res.status(400).json({ 
      message: "Project with this title already exists." });
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

module.exports = { createProject };