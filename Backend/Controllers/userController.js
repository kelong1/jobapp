const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();
// Create a new user
const registerUser =
  ("/register",
  async (req, res) => {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        type,
      });
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        type: newUser.type,
        token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        }),
      });
    } catch (error) {
      res.status(500).json({
        message: "Error registering user",
        error: error.message,
        stack: error.stack,
      });
    }
  });
//log in user
const loginUser =
  ("/login",
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        }),
      });
    } catch (error) {
      res.status(500).json({
        message: "Error logging in",
        error: error.message,
        stack: error.stack,
      });
    }
  });
// Get all users
const getAllUsers =
  ("/",
  async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });

module.exports = { registerUser, loginUser, getAllUsers };
