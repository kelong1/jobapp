const jsonwebtoken = require("jsonwebtoken");
const userSchema = require("../Models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = await userSchema.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
