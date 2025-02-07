const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  creatorName: String,
  email: String,
  phone: String,
  walletAddress: String, // Địa chỉ ví (DÙNG ĐỂ GỬI VỐN ON-CHAIN)
  projectName: String,
  projectType: String, // "truyền thống" | "phi lợi nhuận" | "thương mại"
  description: String,
  targetFunding: Number, // Số tiền cần huy động
  currentFunding: { type: Number, default: 0 }, // Số tiền đã huy động
  startDate: Date,
  endDate: Date,
  profitSharing: Number, // % chia lợi nhuận (CHỈ DÙNG NẾU LÀ DỰ ÁN THƯƠNG MẠI)
  images: [String], // Lưu URL ảnh (CÓ THỂ DÙNG IPFS HOẶC ARWEAVE)
  status: { type: String, default: "pending" }, // pending | approved | completed
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);
