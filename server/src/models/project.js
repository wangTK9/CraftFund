const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  walletAddress: { type: String, required: true }, // Địa chỉ ví (DÙNG ĐỂ GỬI VỐN ON-CHAIN)
  startupProject: { type: String, required: true },
  fundCat: { type: String, required: true }, // Loại quỹ
  detailsProject: { type: String, required: true },
  fundingGoal: { type: Number, required: true }, // Mục tiêu huy động vốn
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  productionDeadline: { type: Date, required: true }, // Hạn hoàn thành sản phẩm
  profitShareRate: { type: Number, default: null }, // Tỷ lệ chia lợi nhuận (nếu có)
  fundUsage: { type: String, required: true }, // Mục đích sử dụng quỹ
  productType: { type: String, required: true }, // Loại sản phẩm
  estimatedQty: { type: Number, default: null }, // Số lượng ước tính
  estimatedPrice: { type: Number, default: null }, // Giá ước tính
  marketingPlan: { type: String, required: true }, // Kế hoạch marketing
  commitment: { type: Boolean, default: false }, // Cam kết
  termsAccepted: { type: Boolean, default: false }, // Điều khoản chấp nhận
  images: { type: [String], default: [] }, // Mảng URL hình ảnh (Có thể dùng IPFS hoặc Arweave)
  status: { type: String, default: "pending" }, // pending | approved | completed
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);
