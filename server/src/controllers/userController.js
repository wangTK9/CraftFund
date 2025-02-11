const User = require("../models/User");

exports.updateUser = async (req, res) => {
  try {
    const {
      walletAddress,
      fullname,
      email,
      investmentInterests,
      investmentAmount,
      role,
    } = req.body;

    console.log("Received data:", req.body); // 🐛 Debug dữ liệu gửi lên

    // Kiểm tra dữ liệu đầu vào
    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    // Tìm user theo walletAddress
    let user = await User.findOne({ walletAddress: walletAddress });

    if (!user) {
      // Nếu không tìm thấy user, tạo mới
      user = new User({
        walletAddress: walletAddress,
        fullname,
        email,
        investmentInterests,
        investmentAmount,
        role,
      });
    } else {
      // Nếu tìm thấy user, cập nhật thông tin
      user.fullname = fullname;
      user.email = email;
      user.investmentInterests = investmentInterests;
      user.investmentAmount = investmentAmount;
      user.role = role;
    }

    // Lưu vào database
    await user.save();
    console.log("Updated user:", user); // 🐛 Debug dữ liệu đã cập nhật

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Server error:", error); // 🐛 In lỗi chi tiết
    res.status(500).json({ error: "Internal Server Error" });
  }
};
