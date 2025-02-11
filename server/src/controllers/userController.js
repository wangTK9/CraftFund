const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: "Wallet address is required" });
    }

    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({ walletAddress });
      await user.save();
      return res
        .status(201)
        .json({ message: "User registered successfully", user });
    }

    return res.status(200).json({ message: "User already registered", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser };
