const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
// Create a new user

module.exports = router;
