const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true, unique: true },
    role: { type: String, default: "investor" },
    email: { type: String, default: "" },
    fullName: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
