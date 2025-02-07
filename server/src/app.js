const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
const app = express();

// Cấu hình CORS chỉ cho phép frontend từ localhost:5173
const corsOptions = {
  origin: "http://localhost:5173", // Cổng frontend đang chạy
  methods: "GET,POST", // Các phương thức HTTP được phép
  allowedHeaders: "Content-Type", // Các header được phép
};

app.use(cors(corsOptions)); // Sử dụng cấu hình CORS này trong Express
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// API Routes
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
