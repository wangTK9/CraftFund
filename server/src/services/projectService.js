const Project = require("../models/project");

exports.createProject = async (projectData) => {
  const newProject = new Project(projectData);
  return await newProject.save();
};

exports.getProjects = async () => {
  return await Project.find();
};
