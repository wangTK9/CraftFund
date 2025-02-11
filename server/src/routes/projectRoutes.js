const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// API lấy tất cả dự án
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find(); // Lấy tất cả dự án từ MongoDB
    res.json(projects);
  } catch (error) {
    console.error("Lỗi lấy danh sách dự án:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

router.post("/", async (req, res) => {
  console.log("Received POST request to create project");

  // Lấy dữ liệu từ body của request
  const data = req.body;

  try {
    // Tạo đối tượng Project mới từ dữ liệu
    const newProject = new Project({
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPhone: data.ownerPhone,
      walletAddress: data.walletAddress,
      startupProject: data.startupProject,
      fundCat: data.fundCat,
      detailsProject: data.detailsProject,
      fundingGoal: data.fundingGoal,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      productionDeadline: new Date(data.productionDeadline),
      profitShareRate: data.profitShareRate,
      fundUsage: data.fundUsage,
      productType: data.productType,
      estimatedQty: data.estimatedQty,
      estimatedPrice: data.estimatedPrice,
      marketingPlan: data.marketingPlan,
      commitment: data.commitment,
      termsAccepted: data.termsAccepted,
      images: data.images,
    });

    // Lưu dự án vào cơ sở dữ liệu
    const savedProject = await newProject.save();
    res.status(201).json(savedProject); // Trả về dự án đã lưu
  } catch (error) {
    // Xử lý lỗi nếu có
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
