const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouter");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Kiểm tra nếu server nhận được yêu cầu nào đó
app.use((req, res, next) => {
  console.log(`📢 Received request: ${req.method} ${req.url}`);
  next();
});

// API Routes
// app.use("/api/users", userRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);

// Route mặc định
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
