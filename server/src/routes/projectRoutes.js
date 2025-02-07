const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.post("/", async (req, res) => {
  console.log("Received POST request to create project");
  try {
    const newProject = new Project({
      projectName: req.body.projectName,
      description: req.body.description,
      fundingGoal: req.body.fundingGoal,
      duration: req.body.duration,
      category: req.body.category,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
