const express = require("express");
const { updateUser } = require("../controllers/userController");

const router = express.Router();

// API cập nhật user
router.put("/user/update", updateUser);

module.exports = router;
