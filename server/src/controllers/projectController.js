const projectService = require("../services/projectService");

exports.createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({ message: "Dự án đã được tạo!", project });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo dự án", error });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách dự án", error });
  }
};
